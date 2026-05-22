import {
	TableSortDirection,
	TableSortState,
} from "../types/sorting";

export class TableSortingState {
	private state: TableSortState = {
		columnId: null,
		direction: null,
	};

	getState(): TableSortState {
		return this.state;
	}

	toggleColumnSort(
		columnId: string
	): void {
		const isSameColumn =
			this.state.columnId === columnId;

		if (!isSameColumn) {
			this.state = {
				columnId,
				direction: "asc",
			};

			return;
		}

		switch (this.state.direction) {
			case "asc":
				this.state.direction = "desc";
				break;

			case "desc":
				this.state = {
					columnId: null,
					direction: null,
				};
				break;

			default:
				this.state.direction = "asc";
		}
	}
}