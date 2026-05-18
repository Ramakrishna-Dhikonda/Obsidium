import { Component } from "solid-js";

import {
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-solid";

interface Props {
  collapsed: boolean;

  onToggle: () => void;
}

const SidebarHeader:
  Component<Props> = (
    props
  ) => {
  return (
    <div class="sidebar-top">
      <div class="logo-wrapper">
        <div class="logo">
        </div>

        <span
          class={`logo-text ${
            props.collapsed
              ? "hidden"
              : ""
          }`}
        >
          Obsidium
        </span>
      </div>

      <button
        class="collapse-button"
        onClick={props.onToggle}
      >
        {props.collapsed ? (
            <PanelLeftOpen
              size={18}
            />
          ) : (
            <PanelLeftClose
              size={18}
            />
          )
        }
      </button>
    </div>
  );
};

export default SidebarHeader;