import {
  Component,
  For
} from "solid-js";

import {
  navigationItems
} from "../navigation/navigation";

import SidebarItem
  from "./SidebarItem";

import type {
  WorkspaceView
} from "../types/view";

interface Props {
  collapsed: boolean;

  activeView: WorkspaceView;

  onViewChange: (
    view: WorkspaceView
  ) => void;
}

const SidebarNavigation:
  Component<Props> = (
    props
  ) => {
  return (
    <nav class="sidebar-nav">
      <For each={navigationItems}>
        {(item) => (
          <SidebarItem
            label={item.label}

            icon={item.icon}

            collapsed={
              props.collapsed
            }

            active={
              props.activeView === item.id
            }

            onClick={() =>
              props.onViewChange(
                item.id
              )
            }
          />
        )}
      </For>
    </nav>
  );
};

export default SidebarNavigation;