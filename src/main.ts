import { Plugin, WorkspaceLeaf } from "obsidian";

import { OBSIDIUM_VIEW_TYPE } from "./core/constants/view";
import { ObsidiumView } from "./views/obsidium/ObsidiumView";

export default class ObsidiumPlugin extends Plugin {
	async onload(): Promise<void> {
		this.registerView(
			OBSIDIUM_VIEW_TYPE,
			(leaf: WorkspaceLeaf) => new ObsidiumView(leaf)
		);

		this.addRibbonIcon(
			"layout-dashboard",
			"Open Obsidium",
			async () => {
				await this.activateView();
			}
		);

		this.registerStyles();
	}

	async onunload(): Promise<void> {
		this.app.workspace.detachLeavesOfType(
			OBSIDIUM_VIEW_TYPE
		);
	}

	private async activateView(): Promise<void> {
		const { workspace } = this.app;

		const existingLeaves =
			workspace.getLeavesOfType(
				OBSIDIUM_VIEW_TYPE
			);

		if (existingLeaves.length > 0) {
			await workspace.revealLeaf(
				existingLeaves[0]
			);

			return;
		}

		const leaf = workspace.getLeaf(true);

		await leaf.setViewState({
			type: OBSIDIUM_VIEW_TYPE,
			active: true,
		});

		await workspace.revealLeaf(leaf);
	}

	private registerStyles(): void {
		const style = document.createElement("style");

		style.id = "obsidium-styles";

		style.textContent = require("./styles/obsidium.css");

		document.head.appendChild(style);

		this.register(() => style.remove());
	}
}