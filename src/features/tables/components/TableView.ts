import {
	MOCK_TABLE_COLUMNS,
	MOCK_TABLE_ROWS,
} from "../data/mockTableData";

import { TableToolbar } from "./TableToolbar";

import { TableHeaderRenderer } from "./TableHeaderRenderer";

import { TableRowRenderer } from "./TableRowRenderer";

import { TableColumnVisibilityState } from "../state/TableColumnVisibilityState";

import { getVisibleColumns } from "../utils/getVisibleColumns";

import { TableColumnVisibilityMenu } from "./TableColumnVisibilityMenu";

import { TableSortingState } from "../state/TableSortingState";

import { getSortedRows } from "../utils/getSortedRows";

export class TableView {
	private visibilityState =
		new TableColumnVisibilityState();

	private sortingState =
		new TableSortingState();

	private rowRenderer =
		new TableRowRenderer();

	private rootEl!: HTMLDivElement;

	private tableContentEl!: HTMLDivElement;

	render(parent: HTMLElement): void {
		this.rootEl = parent.createDiv({
			cls: "obsidium-table-view",
		});

		this.renderToolbar();

		this.tableContentEl =
			this.rootEl.createDiv({
				cls: "obsidium-table-content-region",
			});

		this.renderTable();
	}

	private renderToolbar(): void {
		const toolbar = new TableToolbar({
			onColumnVisibilityClick: (
				event
			) => {
				this.openColumnVisibilityMenu(
					event
				);
			},
		});

		toolbar.render(this.rootEl);
	}

	private openColumnVisibilityMenu(
		event: MouseEvent
	): void {
		const menu =
			new TableColumnVisibilityMenu({
				columns: MOCK_TABLE_COLUMNS,
				visibilityState:
					this.visibilityState,
				onVisibilityChange: () => {
					this.rerenderTable();
				},
			});

		menu.render(event);
	}

	private rerenderTable(): void {
		this.tableContentEl.empty();

		this.renderTable();
	}

	private renderTable(): void {
		const visibleColumns =
			getVisibleColumns(
				MOCK_TABLE_COLUMNS,
				this.visibilityState
			);

		const sortedRows =
			getSortedRows(
				MOCK_TABLE_ROWS,
				visibleColumns,
				this.sortingState.getState()
			);

		const tableContainer =
			this.tableContentEl.createDiv({
				cls: "obsidium-table-container",
			});

		const table =
			tableContainer.createDiv({
				cls: "obsidium-table",
			});

		const headerRenderer =
			new TableHeaderRenderer({
				sortState:
					this.sortingState.getState(),
				onSortChange: (
					columnId
				) => {
					this.sortingState.toggleColumnSort(
						columnId
					);

					this.rerenderTable();
				},
			});

		headerRenderer.render(
			table,
			visibleColumns
		);

		const body = table.createDiv({
			cls: "obsidium-table-body",
		});

		for (const row of sortedRows) {
			this.rowRenderer.render(
				body,
				row,
				visibleColumns
			);
		}
	}
}