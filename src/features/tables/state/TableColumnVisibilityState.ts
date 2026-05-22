export class TableColumnVisibilityState {
	private hiddenColumns =
		new Set<string>();

	isVisible(columnId: string): boolean {
		return !this.hiddenColumns.has(columnId);
	}

	hide(columnId: string): void {
		this.hiddenColumns.add(columnId);
	}

	show(columnId: string): void {
		this.hiddenColumns.delete(columnId);
	}

	toggle(columnId: string): void {
		if (this.hiddenColumns.has(columnId)) {
			this.hiddenColumns.delete(columnId);
			return;
		}

		this.hiddenColumns.add(columnId);
	}

	getHiddenColumns(): string[] {
		return Array.from(this.hiddenColumns);
	}
}