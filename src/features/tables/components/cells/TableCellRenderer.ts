import {
	TableColumn,
	TableRow,
} from "../../types/table";

import { TableClipboardService } from "../../services/TableClipboardService";

export class TableCellRenderer {
	private clipboardService =
		new TableClipboardService();

	render(
		parent: HTMLElement,
		column: TableColumn,
		row: TableRow
	): void {
		const value = row.values[column.id];

		const cell = parent.createDiv({
			cls: `obsidium-table-cell obsidium-table-cell--${column.type}`,
		});

		switch (column.type) {
			case "checkbox":
				this.renderCheckbox(cell, value);
				break;

			case "tags":
				this.renderTags(cell, value);
				break;

			case "status":
				this.renderStatus(cell, value);
				break;

			default:
				cell.setText(String(value ?? ""));
		}
	}

	private renderCheckbox(
		parent: HTMLElement,
		value: unknown
	): void {
		const checkbox = parent.createEl("input", {
			type: "checkbox",
		});

		checkbox.checked = Boolean(value);

		checkbox.disabled = true;
	}

	private renderTags(
		parent: HTMLElement,
		value: unknown
	): void {
		const tags = Array.isArray(value)
			? value
			: [];

		const container = parent.createDiv({
			cls: "obsidium-table-tags-container",
		});

		for (const tag of tags) {
			const tagEl =
				container.createSpan({
					text: String(tag),
					cls: "obsidium-table-tag clickable-tag",
				});

			tagEl.addEventListener(
				"click",
				async () => {
					await this.clipboardService.copyTag(
						String(tag)
					);
				}
			);
		}
	}

	private renderStatus(
		parent: HTMLElement,
		value: unknown
	): void {
		parent.createSpan({
			text: String(value),
			cls: "obsidium-table-status-pill",
		});
	}
}