// The React twin of src/pages/[interaction].astro, bundled by the
// interaction test: busy and idle buttons of the React kit, with counters.
import { createRoot } from "react-dom/client";
import { Button } from "../../kit/react";

const counts = {
  busy: 0,
  idle: 0,
  "busy-action": 0,
  "busy-link": 0,
  "disabled-link": 0,
  link: 0,
  submitBusy: 0,
  submitIdle: 0,
};
(window as unknown as { counts: typeof counts }).counts = counts;

function App() {
  return (
    <>
      <form
        id="busy-form"
        onSubmit={(event) => {
          event.preventDefault();
          counts.submitBusy++;
        }}
      >
        <input id="busy-input" name="x" />
        <Button id="busy" type="submit" variant="primary" busy onClick={() => counts.busy++}>
          Saving
        </Button>
      </form>
      <form
        id="idle-form"
        onSubmit={(event) => {
          event.preventDefault();
          counts.submitIdle++;
        }}
      >
        <input id="idle-input" name="x" />
        <Button id="idle" type="submit" onClick={() => counts.idle++}>
          Save
        </Button>
      </form>
      <Button id="busy-action" busy onClick={() => counts["busy-action"]++}>
        Running
      </Button>
      <Button id="busy-link" href="#busy-link-target" busy onClick={() => counts["busy-link"]++}>
        Opening
      </Button>
      <Button
        id="disabled-link"
        href="#disabled-link-target"
        disabled
        onClick={() => counts["disabled-link"]++}
      >
        Closed
      </Button>
      <Button id="link" href="#link-target" onClick={() => counts.link++}>
        Open
      </Button>
    </>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
