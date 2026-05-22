import {
	MOCK_TABLE_COLUMNS,
	MOCK_TABLE_ROWS,
} from "../data/mockTableData";

import { TableToolbar } from "./TableToolbar";
import { TableHeaderRenderer } from "./TableHeaderRenderer";
import { TableRowRenderer } from "./TableRowRenderer";

export class TableView {
	private toolbar =
		new TableToolbar();

	private headerRenderer =
		new TableHeaderRenderer();

	private rowRenderer =
		new TableRowRenderer();

	render(parent: HTMLElement): void {
		const container = parent.createDiv({
			cls: "obsidium-table-view",
		});

		this.toolbar.render(container);

		const tableContainer =
			container.createDiv({
				cls: "obsidium-table-container",
			});

		const table =
			tableContainer.createDiv({
				cls: "obsidium-table",
			});

		this.headerRenderer.render(
			table,
			MOCK_TABLE_COLUMNS
		);

		const body = table.createDiv({
			cls: "obsidium-table-body",
		});

		for (const row of MOCK_TABLE_ROWS) {
			this.rowRenderer.render(
				body,
				row,
				MOCK_TABLE_COLUMNS
			);
		}
	}
}