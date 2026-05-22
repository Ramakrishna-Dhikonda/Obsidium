import {
	TableColumn,
	TableRow,
} from "../types/table";

import { TableSortState } from "../types/sorting";

import { tableComparators } from "../sorting/tableComparators";

export function getSortedRows(
	rows: TableRow[],
	columns: TableColumn[],
	sortState: TableSortState
): TableRow[] {
	if (
		!sortState.columnId ||
		!sortState.direction
	) {
		return [...rows];
	}

	const column = columns.find(
		(col) =>
			col.id === sortState.columnId
	);

	if (
		!column ||
		!column.sortable
	) {
		return [...rows];
	}

	const comparator =
		tableComparators[column.type];

	if (!comparator) {
		return [...rows];
	}

	const sorted = [...rows].sort(
		(a, b) => {
			const result = comparator(
				a.values[column.id],
				b.values[column.id]
			);

			return sortState.direction ===
				"asc"
				? result
				: -result;
		}
	);

	return sorted;
}