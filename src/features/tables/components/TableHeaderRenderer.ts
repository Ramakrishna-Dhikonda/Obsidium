import { TableColumn } from "../types/table";

export class TableHeaderRenderer {
	render(
		parent: HTMLElement,
		columns: TableColumn[]
	): void {
		const header =
			parent.createDiv({
				cls: "obsidium-table-header",
			});

		for (const column of columns) {
			const headerCell =
				header.createDiv({
					cls: "obsidium-table-header-cell",
					text: column.label,
				});

			if (column.width) {
				headerCell.style.width = `${column.width}px`;
				headerCell.style.minWidth = `${column.width}px`;
			}
		}
	}
}