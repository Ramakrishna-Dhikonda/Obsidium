import { Component } from "solid-js";

import Sidebar
  from "../sidebar/Sidebar";

import Toolbar
  from "./Toolbar";

import WorkspaceViewport
  from "../workspace/WorkspaceViewport";

const AppShell: Component = () => {
  return (
    <div class="app-shell">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN SURFACE */}

      <main class="main-surface">
        {/* TOP TOOLBAR */}

        <Toolbar />

      </main>
    </div>
  );
};

export default AppShell;