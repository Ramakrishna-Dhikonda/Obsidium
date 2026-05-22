export type TableSortDirection =
	| "asc"
	| "desc"
	| null;

export interface TableSortState {
	columnId: string | null;
	direction: TableSortDirection;
}