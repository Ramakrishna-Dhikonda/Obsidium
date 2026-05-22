import { setIcon } from "obsidian";

interface TableToolbarProps {
	onColumnVisibilityClick: (
		event: MouseEvent
	) => void;
}

export class TableToolbar {
	constructor(
		private props: TableToolbarProps
	) {}

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

		this.createIconButton(
			leftActions,
			"plus"
		);

		this.createIconButton(
			leftActions,
			"filter"
		);

		this.createIconButton(
			leftActions,
			"arrow-up-down"
		);

		this.createIconButton(
			rightActions,
			"columns-3",
			this.props.onColumnVisibilityClick
		);

		this.createIconButton(
			rightActions,
			"search"
		);

		this.createIconButton(
			rightActions,
			"settings-2"
		);
	}

	private createIconButton(
		parent: HTMLElement,
		icon: string,
		onClick?: (
			event: MouseEvent
		) => void
	): void {
		const button = parent.createDiv({
			cls: "clickable-icon obsidium-table-toolbar-button",
		});

		setIcon(button, icon);

		if (onClick) {
			button.addEventListener(
				"click",
				onClick
			);
		}
	}
}