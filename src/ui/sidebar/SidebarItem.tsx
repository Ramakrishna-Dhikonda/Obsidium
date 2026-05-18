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
}

const SidebarItem:
  Component<SidebarItemProps> = (
    props
  ) => {
  return (
    <div class="nav-item">
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