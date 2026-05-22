import { Menu } from "obsidian";

import { TableColumn } from "../types/table";

import { TableColumnVisibilityState } from "../state/TableColumnVisibilityState";

interface TableColumnVisibilityMenuProps {
	columns: TableColumn[];

	visibilityState: TableColumnVisibilityState;

	onVisibilityChange: () => void;
}

export class TableColumnVisibilityMenu {
	constructor(
		private props: TableColumnVisibilityMenuProps
	) {}

	render(
		event: MouseEvent | PointerEvent
	): void {
		const menu = new Menu();

		for (const column of this.props.columns) {
			const isVisible =
				this.props.visibilityState.isVisible(
					column.id
				);

			menu.addItem((item) => {
				item
					.setTitle(column.label)
					.setChecked(isVisible)
					.onClick(() => {
						this.props.visibilityState.toggle(
							column.id
						);

						this.props.onVisibilityChange();
					});
			});
		}

		menu.showAtMouseEvent(event);
	}
}