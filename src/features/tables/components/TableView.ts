import { App } from "obsidian";

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

import { TableDateFilterState } from "../state/TableDateFilterState";

import { getFilteredRows } from "../utils/getFilteredRows";

import { getDateColumns } from "../utils/getDateColumns";

import { TableDateFilterMenu } from "./TableDateFilterMenu";

import { TableColumn } from "../types/table";

import { TableRow } from "../types/table";

import { CreateRowModal } from "./modals/CreateRowModal";

export class TableView {
	private visibilityState =
		new TableColumnVisibilityState();

	private sortingState =
		new TableSortingState();

	private dateFilterState =
		new TableDateFilterState();

	private rowRenderer =
		new TableRowRenderer();

	private rootEl!: HTMLDivElement;

	private tableContentEl!: HTMLDivElement;

	private rows: TableRow[] = [
		...MOCK_TABLE_ROWS,
	];

	
	constructor(private app: App) {}

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
		const dateColumns =
			getDateColumns(
				MOCK_TABLE_COLUMNS
			);

		const currentFilter =
			this.dateFilterState.getFilter();

		const dateFilterLabel =
			this.buildDateFilterLabel();

		const toolbar = new TableToolbar({
			onColumnVisibilityClick: (
				event
			) => {
				this.openColumnVisibilityMenu(
					event
				);
			},

			onCreateRowClick: () => {
				this.openCreateRowModal();
			},
			onDateFilterClick: () => {
				this.openDateFilterMenu();
			},

			showDateFilter:
				dateColumns.length > 0,

			dateFilterLabel,

			hasActiveDateFilter:
				this.dateFilterState.isActive(),
		});

		toolbar.render(this.rootEl);
	}

	private openCreateRowModal(): void {
		new CreateRowModal(this.app, {
			columns: MOCK_TABLE_COLUMNS,

			onCreate: (row) => {
				this.rows.push(row);

				this.rerenderTable();
			},
		}).open();
	}

	private buildDateFilterLabel():
		| string
		| null {
		const filter =
			this.dateFilterState.getFilter();

		if (
			!filter.startDate ||
			!filter.endDate
		) {
			return null;
		}

		const formatter =
			new Intl.DateTimeFormat(
				"default",
				{
					month: "short",
					day: "numeric",
					year: "numeric",
				}
			);

		return `${formatter.format(
			new Date(filter.startDate)
		)} - ${formatter.format(
			new Date(filter.endDate)
		)}`;
	}

	private openDateFilterMenu(): void {
		const menu =
			new TableDateFilterMenu({
				app: this.app,

				dateColumns:
					getDateColumns(
						MOCK_TABLE_COLUMNS
					),

				filterState:
					this.dateFilterState,

				onApply: () => {
					this.rerenderEntireTableView();
				},
			});

		menu.open();
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

	private rerenderEntireTableView(): void {
		this.rootEl.empty();

		this.render(this.rootEl);
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

		const gridTemplate =
			this.buildGridTemplate(
				visibleColumns
			);

		const filteredRows =
			getFilteredRows(
				this.rows,
				this.dateFilterState.getFilter()
			);

		const sortedRows =
			getSortedRows(
				filteredRows,
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
			visibleColumns,
			gridTemplate
		);

		const body = table.createDiv({
			cls: "obsidium-table-body",
		});

		for (const row of sortedRows) {
			this.rowRenderer.render(
				body,
				row,
				visibleColumns,
				gridTemplate
			);
		}
	}

	private buildGridTemplate(
		visibleColumns: TableColumn[]
	): string {
		return visibleColumns
			.map((column) => {
				/**
				 * Base minimum width
				 * prevents unusably tiny columns
				 */
				const minWidth = 140;

				/**
				 * Larger columns receive
				 * slightly larger flex ratios
				 */
				const flexRatio = column.width
					? Math.max(
							1,
							Math.round(
								column.width / 140
							)
					)
					: 1;

				return `minmax(${minWidth}px, ${flexRatio}fr)`;
			})
			.join(" ");
	}
}