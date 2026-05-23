import { Setting } from "obsidian";

import { TableColumn } from "../../types/table";

import {
	TABLE_PRIORITY_OPTIONS,
	TABLE_STATUS_OPTIONS,
} from "../../constants/tableFieldOptions";

interface TableFieldRendererProps {
	column: TableColumn;

	values: Record<string, unknown>;

	parent: HTMLElement;
}

export class TableFieldRenderer {
	constructor(
		private props: TableFieldRendererProps
	) {}

	render(): void {
		const {
			column,
			values,
			parent,
		} = this.props;

		const value =
			values[column.id];

		switch (column.type) {
			case "checkbox":
				this.renderCheckbox(
					parent,
					column,
					value
				);
				break;

			case "status":
				this.renderStatusDropdown(
					parent,
					column,
					value
				);
				break;

			case "priority":
				this.renderPriorityDropdown(
					parent,
					column,
					value
				);
				break;

			case "date":
				this.renderDateInput(
					parent,
					column,
					value
				);
				break;

			case "number":
				this.renderNumberInput(
					parent,
					column,
					value
				);
				break;

			case "tags":
				this.renderTagsInput(
					parent,
					column,
					value
				);
				break;

			default:
				this.renderTextInput(
					parent,
					column,
					value
				);
		}
	}

	private renderTextInput(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addText((text) => {
				text.setValue(
					String(value ?? "")
				);

				text.onChange((val) => {
					this.props.values[
						column.id
					] = val;
				});
			});
	}

	private renderNumberInput(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addText((text) => {
				text.inputEl.type = "number";

				text.setValue(
					String(value ?? "")
				);

				text.onChange((val) => {
					this.props.values[
						column.id
					] = Number(val);
				});
			});
	}

	private renderDateInput(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addText((text) => {
				text.inputEl.type = "date";

				text.setValue(
					String(value ?? "")
				);

				text.onChange((val) => {
					this.props.values[
						column.id
					] = val;
				});
			});
	}

	private renderCheckbox(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addToggle((toggle) => {
				toggle.setValue(
					Boolean(value)
				);

				toggle.onChange((val) => {
					this.props.values[
						column.id
					] = val;
				});
			});
	}

	private renderStatusDropdown(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addDropdown(
				(dropdown) => {
					for (const option of TABLE_STATUS_OPTIONS) {
						dropdown.addOption(
							option,
							option
						);
					}

					dropdown.setValue(
						String(value)
					);

					dropdown.onChange(
						(val) => {
							this.props.values[
								column.id
							] = val;
						}
					);
				}
			);
	}

	private renderPriorityDropdown(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.addDropdown(
				(dropdown) => {
					for (const option of TABLE_PRIORITY_OPTIONS) {
						dropdown.addOption(
							option,
							option
						);
					}

					dropdown.setValue(
						String(value)
					);

					dropdown.onChange(
						(val) => {
							this.props.values[
								column.id
							] = val;
						}
					);
				}
			);
	}

	private renderTagsInput(
		parent: HTMLElement,
		column: TableColumn,
		value: unknown
	): void {
		new Setting(parent)
			.setName(column.label)
			.setDesc(
				"Comma separated tags"
			)
			.addTextArea((text) => {
				text.setValue(
					Array.isArray(value)
						? value.join(", ")
						: ""
				);

				text.onChange((val) => {
					this.props.values[
						column.id
					] = val
						.split(",")
						.map((tag) =>
							tag.trim()
						)
						.filter(Boolean);
				});
			});
	}
}