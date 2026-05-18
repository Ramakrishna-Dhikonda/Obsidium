import {
  ItemView,
  WorkspaceLeaf
} from "obsidian";

import { render }
  from "solid-js/web";

import App
  from "../ui/App";

import {
  VIEW_TYPE_OBSIBOARD
} from "./constants";

export class ObsiBoardView
  extends ItemView {

  private dispose?: () => void;

  constructor(
    leaf: WorkspaceLeaf
  ) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_OBSIBOARD;
  }

  getDisplayText(): string {
    return "Obsidium";
  }

  async onOpen() {
    const root =
      this.containerEl.children[1];

    this.dispose = render(
      () => <App />,
      root
    );
  }

  async onClose() {
    this.dispose?.();
  }
}