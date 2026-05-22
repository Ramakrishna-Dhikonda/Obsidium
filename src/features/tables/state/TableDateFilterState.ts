import { DateRangeFilter } from "../types/filters";

export class TableDateFilterState {
	private filter: DateRangeFilter = {
		columnId: null,
		startDate: null,
		endDate: null,
	};

	getFilter(): DateRangeFilter {
		return this.filter;
	}

	setFilter(
		filter: DateRangeFilter
	): void {
		this.filter = filter;
	}

	clear(): void {
		this.filter = {
			columnId: null,
			startDate: null,
			endDate: null,
		};
	}

	isActive(): boolean {
		return Boolean(
			this.filter.columnId &&
				this.filter.startDate &&
				this.filter.endDate
		);
	}
}