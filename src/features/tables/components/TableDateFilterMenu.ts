import {
	Menu,
	Modal,
	Setting,
} from "obsidian";

import { App } from "obsidian";

import { TableColumn } from "../types/table";

import { TableDateFilterState } from "../state/TableDateFilterState";

interface TableDateFilterMenuProps {
	app: App;

	dateColumns: TableColumn[];

	filterState: TableDateFilterState;

	onApply: () => void;
}

export class TableDateFilterMenu {
	constructor(
		private props: TableDateFilterMenuProps
	) {}

	open(): void {
		new DateFilterModal(
			this.props.app,
			this.props.dateColumns,
			this.props.filterState,
			this.props.onApply
		).open();
	}
}

class DateFilterModal extends Modal {
	constructor(
		app: App,

		private dateColumns: TableColumn[],

		private filterState: TableDateFilterState,

		private onApply: () => void
	) {
		super(app);
	}

	onOpen(): void {
		const { contentEl } = this;

		contentEl.empty();

		contentEl.createEl("h3", {
			text: "Date Range Filter",
		});

		const currentFilter =
			this.filterState.getFilter();

		let selectedColumn =
			currentFilter.columnId ??
			this.dateColumns[0]?.id ??
			null;

		let startDate =
			currentFilter.startDate ?? "";

		let endDate =
			currentFilter.endDate ?? "";

		if (
			this.dateColumns.length > 1
		) {
			new Setting(contentEl)
				.setName("Date Column")
				.addDropdown(
					(dropdown) => {
						for (const column of this
							.dateColumns) {
							dropdown.addOption(
								column.id,
								column.label
							);
						}

						if (selectedColumn) {
							dropdown.setValue(
								selectedColumn
							);
						}

						dropdown.onChange(
							(value) => {
								selectedColumn =
									value;
							}
						);
					}
				);
		}

		new Setting(contentEl)
			.setName("Start Date")
			.addText((text) => {
				text.inputEl.type = "date";

				text.setValue(startDate);

				text.onChange((value) => {
					startDate = value;
				});
			});

		new Setting(contentEl)
			.setName("End Date")
			.addText((text) => {
				text.inputEl.type = "date";

				text.setValue(endDate);

				text.onChange((value) => {
					endDate = value;
				});
			});

		new Setting(contentEl)
			.addButton((button) => {
				button
					.setButtonText("Apply")
					.setCta()
					.onClick(() => {
						this.filterState.setFilter(
							{
								columnId:
									selectedColumn,
								startDate,
								endDate,
							}
						);

						this.onApply();

						this.close();
					});
			})
			.addExtraButton((button) => {
				button
					.setIcon("reset")
					.setTooltip("Clear Filter")
					.onClick(() => {
						this.filterState.clear();

						this.onApply();

						this.close();
					});
			});
	}

	onClose(): void {
		this.contentEl.empty();
	}
}