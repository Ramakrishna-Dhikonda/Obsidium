import { TableRow } from "../types/table";

import { DateRangeFilter } from "../types/filters";

export function getFilteredRows(
	rows: TableRow[],
	filter: DateRangeFilter
): TableRow[] {
	if (
		!filter.columnId ||
		!filter.startDate ||
		!filter.endDate
	) {
		return [...rows];
	}

	const start =
		new Date(filter.startDate).getTime();

	const end =
		new Date(filter.endDate).getTime();

	return rows.filter((row) => {
		const value =
			row.values[filter.columnId];

		if (!value) {
			return false;
		}

		const rowDate =
			new Date(
				String(value)
			).getTime();

		return (
			rowDate >= start &&
			rowDate <= end
		);
	});
}