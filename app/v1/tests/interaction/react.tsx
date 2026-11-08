// The React twin of src/pages/[interaction].astro, bundled by the
// interaction test: busy and idle buttons of the React kit, with counters.
import { createRoot } from "react-dom/client";
import { Button } from "../../kit/react";

const counts = { busy: 0, idle: 0, "busy-action": 0, submitBusy: 0, submitIdle: 0 };
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
      <Button id="busy-link" href="/elsewhere/" busy>
        Opening
      </Button>
    </>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
