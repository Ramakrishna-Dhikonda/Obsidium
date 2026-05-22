import { setIcon } from "obsidian";

import { TableColumn } from "../types/table";

import { TableSortState } from "../types/sorting";

interface TableHeaderRendererProps {
	sortState: TableSortState;

	onSortChange: (
		columnId: string
	) => void;
}

export class TableHeaderRenderer {
	constructor(
		private props: TableHeaderRendererProps
	) {}

	render(
		parent: HTMLElement,
		columns: TableColumn[]
	): void {
		const header =
			parent.createDiv({
				cls: "obsidium-table-header",
			});

		for (const column of columns) {
			const isSortable =
				column.sortable === true;

			const isActiveSort =
				this.props.sortState
					.columnId === column.id;

			const headerCell =
				header.createDiv({
					cls: `obsidium-table-header-cell ${
						isSortable
							? "is-sortable"
							: ""
					}`,
				});

			if (column.width) {
				headerCell.style.width = `${column.width}px`;

				headerCell.style.minWidth = `${column.width}px`;
			}

			const labelWrapper =
				headerCell.createDiv({
					cls: "obsidium-table-header-label",
				});

			labelWrapper.createSpan({
				text: column.label,
			});

			if (isSortable) {
				const sortIcon =
					labelWrapper.createDiv({
						cls: "obsidium-table-sort-icon",
					});

				if (isActiveSort) {
					setIcon(
						sortIcon,
						this.props.sortState
							.direction === "asc"
							? "chevron-up"
							: "chevron-down"
					);
				} else {
					setIcon(
						sortIcon,
						"arrow-up-down"
					);
				}

				headerCell.addEventListener(
					"click",
					() => {
						this.props.onSortChange(
							column.id
						);
					}
				);
			}
		}
	}
}