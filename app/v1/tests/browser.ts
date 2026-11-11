// A headless Chrome for interaction tests, driven over the Chrome DevTools
// Protocol with Bun's own WebSocket: real (trusted) clicks and key presses, so
// the browser's activation behaviour, not a simulation, decides what happens.
import { existsSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export function findChrome(): string | null {
  const home = process.env.HOME ?? "";
  const managed = join(home, ".agent-browser/browsers");
  const candidates = [
    process.env.CHROME_BIN,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    ...(existsSync(managed) ? readdirSync(managed).map((dir) => join(managed, dir, "chrome")) : []),
  ];
  return candidates.find((path): path is string => Boolean(path && existsSync(path))) ?? null;
}

type Pending = { resolve: (value: unknown) => void; reject: (error: Error) => void };

export class Browser {
  private next = 1;
  private pending = new Map<number, Pending>();
  private listeners: ((method: string) => void)[] = [];

  private constructor(
    private readonly process: ReturnType<typeof Bun.spawn>,
    private readonly profile: string,
    private readonly socket: WebSocket,
  ) {
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data)) as {
        id?: number;
        method?: string;
        result?: unknown;
        error?: { message: string };
      };
      if (message.id !== undefined) {
        const waiting = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) waiting?.reject(new Error(message.error.message));
        else waiting?.resolve(message.result);
      } else if (message.method) {
        for (const listener of this.listeners) listener(message.method);
      }
    });
  }

  static async open(chrome: string): Promise<Browser> {
    const profile = mkdtempSync(join(realpathSync.native(tmpdir()), "ds-chrome-"));
    const child = Bun.spawn(
      [
        chrome,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${profile}`,
        "--remote-debugging-port=0",
        "about:blank",
      ],
      { stdout: "ignore", stderr: "ignore" },
    );
    const portFile = join(profile, "DevToolsActivePort");
    for (let i = 0; i < 200 && !existsSync(portFile); i++) await Bun.sleep(50);
    const port = readFileSync(portFile, "utf8").split("\n")[0];
    let target: { type: string; webSocketDebuggerUrl: string } | undefined;
    for (let i = 0; i < 100 && !target; i++) {
      const list = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as {
        type: string;
        webSocketDebuggerUrl: string;
      }[];
      target = list.find((entry) => entry.type === "page");
      if (!target) await Bun.sleep(50);
    }
    if (!target) throw new Error("Chrome opened no page");
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });
    const browser = new Browser(child, profile, socket);
    await browser.send("Page.enable");
    await browser.send("Runtime.enable");
    return browser;
  }

  send(method: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const id = this.next++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async goto(url: string): Promise<void> {
    const loaded = new Promise<void>((resolve) => {
      const listener = (method: string) => {
        if (method !== "Page.loadEventFired") return;
        this.listeners = this.listeners.filter((l) => l !== listener);
        resolve();
      };
      this.listeners.push(listener);
    });
    await this.send("Page.navigate", { url });
    await loaded;
  }

  async eval<T>(expression: string): Promise<T> {
    const result = (await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })) as { result: { value: T }; exceptionDetails?: { text: string } };
    if (result.exceptionDetails) throw new Error(`${expression}: ${result.exceptionDetails.text}`);
    return result.result.value;
  }

  async click(selector: string): Promise<void> {
    const box = await this.eval<{ x: number; y: number }>(
      `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`,
    );
    for (const type of ["mousePressed", "mouseReleased"]) {
      await this.send("Input.dispatchMouseEvent", {
        type,
        x: box.x,
        y: box.y,
        button: "left",
        clickCount: 1,
      });
    }
    await Bun.sleep(30);
  }

  async focus(selector: string): Promise<void> {
    await this.eval(`document.querySelector(${JSON.stringify(selector)}).focus()`);
  }

  async press(key: "Enter" | "Space"): Promise<void> {
    const keys = {
      Enter: { key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" },
      Space: { key: " ", code: "Space", windowsVirtualKeyCode: 32, text: " " },
    }[key];
    await this.send("Input.dispatchKeyEvent", {
      type: "keyDown",
      ...keys,
      unmodifiedText: keys.text,
    });
    await this.send("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: keys.key,
      code: keys.code,
      windowsVirtualKeyCode: keys.windowsVirtualKeyCode,
    });
    await Bun.sleep(30);
  }

  close(): void {
    this.socket.close();
    this.process.kill();
    rmSync(this.profile, { recursive: true, force: true });
  }
}
