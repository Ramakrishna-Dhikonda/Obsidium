import {
  Plugin
} from "obsidian";

import {
  VIEW_TYPE_OBSIBOARD
} from "./obsidian/constants";

import {
  ObsiBoardView
} from "./obsidian/ObsiBoardView";

export default class ObsiBoardPlugin
  extends Plugin {

  async onload() {
    console.log(
      "ObsiBoard Loaded"
    );

    /*
      Register Workspace View
    */

    this.registerView(
      VIEW_TYPE_OBSIBOARD,

      (leaf) =>
        new ObsiBoardView(
          leaf
        )
    );

    /*
      Ribbon Icon
    */

    this.addRibbonIcon(
      /* RIBBON ICON -> https://lucide.dev/icons/layout-dashboard for more */
      "layout-dashboard",
      "Open Obsidium",
      async () => {
        const leaf = this.app.workspace.getLeaf(true);
        await leaf.setViewState({
          type: VIEW_TYPE_OBSIBOARD,
          active: true
        });
        this.app.workspace.revealLeaf(leaf);
      }
    );
  }

  onunload() {
    this.app.workspace
      .getLeavesOfType(
        VIEW_TYPE_OBSIBOARD
      )
      .forEach((leaf) =>
        leaf.detach()
      );
  }
}