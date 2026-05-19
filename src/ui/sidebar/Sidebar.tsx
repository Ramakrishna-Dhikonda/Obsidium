import {
    Component,
    createSignal
} from "solid-js";

import SidebarHeader
    from "./SidebarHeader";

import SidebarNavigation
    from "./SidebarNavigation";

import type {
  WorkspaceView
} from "../types/view";

interface SidebarProps {
  activeView: WorkspaceView;

  onViewChange: (
    view: WorkspaceView
  ) => void;
}

const Sidebar: Component<SidebarProps> = (props) => {

    const [collapsed, setCollapsed] = createSignal(false);

    return (
        <aside class={`sidebar ${collapsed() ? "collapsed" : ""}`} >

            <SidebarHeader
                collapsed={collapsed()}
                onToggle={() =>
                    setCollapsed(
                        !collapsed()
                    )
                }
            />

            <div class="sidebar-divider" />

            <div class="sidebar-content">
                <SidebarNavigation collapsed={collapsed()}
                    activeView={
                        props.activeView
                    }
                    onViewChange={
                        props.onViewChange
                    }
                />
            </div>
        </aside>
    );
};

export default Sidebar;