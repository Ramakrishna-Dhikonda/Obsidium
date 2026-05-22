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
		columns: TableColumn[]
	): void {
		const rowEl = parent.createDiv({
			cls: "obsidium-table-row",
		});

		for (const column of columns) {
			const cellWrapper =
				rowEl.createDiv({
					cls: "obsidium-table-cell-wrapper",
				});

			if (column.width) {
				cellWrapper.style.width = `${column.width}px`;
				cellWrapper.style.minWidth = `${column.width}px`;
			}

			this.cellRenderer.render(
				cellWrapper,
				column,
				row
			);
		}
	}
}