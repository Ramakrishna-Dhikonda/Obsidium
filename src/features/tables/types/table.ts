export type TableColumnType =
	| "text"
	| "number"
	| "select"
	| "tags"
	| "checkbox"
	| "status"
	| "date"
	| "user";

export interface TableColumn {
	id: string;
	label: string;
	type: TableColumnType;
	width?: number;

    defaultHidden?: boolean;

    sortable?: boolean;
}

export interface TableRow {
	id: string;
	values: Record<string, unknown>;
}