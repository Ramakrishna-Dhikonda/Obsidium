import { TableColumn } from "../types/table";

import {
	TABLE_PRIORITY_OPTIONS,
	TABLE_STATUS_OPTIONS,
} from "../constants/tableFieldOptions";

export function createDefaultRowValues(
	columns: TableColumn[]
): Record<string, unknown> {
	const values: Record<
		string,
		unknown
	> = {};

	for (const column of columns) {
		switch (column.type) {
			case "date":
				values[column.id] =
					new Date()
						.toISOString()
						.split("T")[0];
				break;

			case "status":
				values[column.id] =
					TABLE_STATUS_OPTIONS[0];
				break;

			case "priority":
				values[column.id] =
					"Medium";
				break;

			case "checkbox":
				values[column.id] = false;
				break;

			case "tags":
				values[column.id] = [];
				break;

			default:
				values[column.id] = "";
		}
	}

	return values;
}