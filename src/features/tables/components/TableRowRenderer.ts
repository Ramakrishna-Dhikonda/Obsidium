import {
	TableColumn,
	TableRow,
} from "../types/table";

import { TableCellRenderer } from "./cells/TableCellRenderer";

export class TableRowRenderer {
	private cellRenderer =
		new TableCellRenderer();

	render(
		parent: HTMLElement,
		row: TableRow,
		columns: TableColumn[],
		gridTemplate: string
	): void {
		const rowEl = parent.createDiv({
			cls: "obsidium-table-row",
		});

		rowEl.style.gridTemplateColumns = gridTemplate;

		for (const column of columns) {
			const cellWrapper =
				rowEl.createDiv({
					cls: "obsidium-table-cell-wrapper",
				});

			this.cellRenderer.render(
				cellWrapper,
				column,
				row
			);
		}
	}
}