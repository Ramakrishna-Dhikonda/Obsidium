import { TableColumn } from "../types/table";

import { TableColumnVisibilityState } from "../state/TableColumnVisibilityState";

export function getVisibleColumns(
	columns: TableColumn[],
	visibilityState: TableColumnVisibilityState
): TableColumn[] {
	return columns.filter((column) =>
		visibilityState.isVisible(column.id)
	);
}