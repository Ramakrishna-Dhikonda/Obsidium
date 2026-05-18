import {
    Component,
    createSignal
} from "solid-js";

import SidebarHeader
    from "./SidebarHeader";

import SidebarNavigation
    from "./SidebarNavigation";


const Sidebar: Component = () => {
    const [collapsed, setCollapsed] =
        createSignal(false);

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
                <SidebarNavigation
                    collapsed={collapsed()}
                />
            </div>
        </aside>
    );
};

export default Sidebar;