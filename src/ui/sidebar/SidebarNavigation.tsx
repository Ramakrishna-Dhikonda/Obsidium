import {
  Component,
  For
} from "solid-js";

import {
  navigationItems
} from "../navigation/navigation";

import SidebarItem
  from "./SidebarItem";

interface Props {
  collapsed: boolean;
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
          />
        )}
      </For>
    </nav>
  );
};

export default SidebarNavigation;