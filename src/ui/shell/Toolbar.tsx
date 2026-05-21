import { Pen } from "lucide-solid";
import { 
  Component,
  createSignal,
  Show
} from "solid-js";

const Toolbar: Component = () => {
const [
  title,
  setTitle
] = createSignal(
  "Workspace"
);

const [
  editingTitle,
  setEditingTitle
] = createSignal(false);

  return (
    <header class="toolbar">
      <Show
       when={!editingTitle()}
       fallback = {
          <input
            class="toolbar-title"
            value={title()}
            autofocus
            oninput={(e) => setTitle(e.currentTarget.value)}
            onblur={() => {setEditingTitle(false)}}
            onkeydown={(e) => {
              if (e.key === "Enter") {
                setEditingTitle(false);
              }
            }}
          >
          </input>
       }
      >
        <div class="toolbar-title">
          {title()}
        </div>
      </Show>
      
      {/* Edit button */}
      <div class="toolbar-actions">
        <button class="icon-button"
          onClick={() => {setEditingTitle(true)}}
        >
          <Pen size={20} />
        </button>
      </div>
    </header>
  );
};

export default Toolbar;