import {
  Component,
  createSignal,
  Match,
  Switch
} from "solid-js";

import type {
  WorkspaceView
} from "../types/view";

import Sidebar
  from "../sidebar/Sidebar";

import Toolbar
  from "./Toolbar";

import WorkspaceViewport
  from "../workspace/WorkspaceViewport";


const AppShell: Component = () => {

  const [
    activeView,
    setActiveView
  ] = createSignal<WorkspaceView>(
    "tables"
  );

  return (
    <div class="app-shell">
      {/* SIDEBAR */}

      <Sidebar
        activeView={activeView()}
        onViewChange={setActiveView}
      />

      {/* MAIN SURFACE */}

      <main class="main-surface">
        {/* TOP TOOLBAR */}

        <Toolbar />

        {/* MAIN BODY */}
        <Switch>

          <Match
            when={
              activeView() === "tables"
            }
          >
            <WorkspaceViewport />
          </Match>

          <Match
            when={
              activeView() === "dashboard"
            }
          >
            <div class="page-placeholder">
              Dashboard Page
            </div>
          </Match>

          <Match
            when={
              activeView() === "calendar"
            }
          >
            <div class="page-placeholder">
              Calendar Page
            </div>
          </Match>

          <Match
            when={
              activeView() === "settings"
            }
          >
            <div class="page-placeholder">
              Settings Page
            </div>
          </Match>

        </Switch>

      </main>
    </div>
  );
};

export default AppShell;