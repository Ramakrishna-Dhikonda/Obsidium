import type {
  Component
} from "solid-js";

import type {
  LucideIcon
} from "lucide-solid";

interface SidebarItemProps {
  label: string;

  icon: LucideIcon;

  collapsed: boolean;

  active: boolean;

  onClick: () => void;
}

const SidebarItem:
  Component<SidebarItemProps> = (
    props
  ) => {
  return (
    <div
      classList={{
        "nav-item": true,
        active: props.active
      }}

      onClick={props.onClick}
    >
      <div class="nav-icon">
        <props.icon
          size={18}
        />
      </div>

      <span
        class={`nav-label ${
          props.collapsed
            ? "hidden"
            : ""
        }`}
      >
        {props.label}
      </span>
    </div>
  );
};

export default SidebarItem;