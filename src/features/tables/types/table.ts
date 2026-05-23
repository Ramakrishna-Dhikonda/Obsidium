export type TableColumnType =
	| "text"
	| "number"
	| "select"
	| "tags"
	| "checkbox"
	| "status"
	| "date"
	| "user";

export type TableColumnVariant =
	| "priority"
	| "status";

export interface TableColumn {
	id: string;
	label: string;
	type: TableColumnType;
	variant?: TableColumnVariant;
	width?: number;
    defaultHidden?: boolean;

    sortable?: boolean;
}

export interface TableRow {
	id: string;
	values: Record<string, unknown>;
}