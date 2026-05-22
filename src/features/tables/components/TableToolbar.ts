import { setIcon } from "obsidian";

export class TableToolbar {
	render(parent: HTMLElement): void {
		const toolbar = parent.createDiv({
			cls: "obsidium-table-toolbar",
		});

		const leftActions = toolbar.createDiv({
			cls: "obsidium-table-toolbar-section",
		});

		const rightActions = toolbar.createDiv({
			cls: "obsidium-table-toolbar-section",
		});

		this.createIconButton(leftActions, "plus");
		this.createIconButton(leftActions, "filter");
		this.createIconButton(leftActions, "arrow-up-down");

		this.createIconButton(rightActions, "search");
		this.createIconButton(rightActions, "settings-2");
	}

	private createIconButton(
		parent: HTMLElement,
		icon: string
	): void {
		const button = parent.createDiv({
			cls: "clickable-icon obsidium-table-toolbar-button",
		});

		setIcon(button, icon);
	}
}