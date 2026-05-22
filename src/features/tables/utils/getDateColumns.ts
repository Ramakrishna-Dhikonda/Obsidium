import { TableColumn } from "../types/table";

export function getDateColumns(
	columns: TableColumn[]
): TableColumn[] {
	return columns.filter(
		(column) => column.type === "date"
	);
}