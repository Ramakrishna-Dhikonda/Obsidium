import {
	App,
	Modal,
	Setting,
} from "obsidian";

import {
	TableColumn,
	TableRow,
} from "../../types/table";

import { createDefaultRowValues } from "../../utils/createDefaultRowValues";

import { TableFieldRenderer } from "../forms/TableFieldRenderer";

interface CreateRowModalProps {
	columns: TableColumn[];

	onCreate: (
		row: TableRow
	) => void;
}

export class CreateRowModal extends Modal {
	private values: Record<
		string,
		unknown
	>;

	constructor(
		app: App,

		private props: CreateRowModalProps
	) {
		super(app);

		this.values =
			createDefaultRowValues(
				props.columns
			);
	}

	onOpen(): void {
		const { contentEl } = this;

		contentEl.empty();

		contentEl.createEl("h2", {
			text: "Create Row",
		});

		for (const column of this
			.props.columns) {
			const renderer =
				new TableFieldRenderer({
					column,

					values: this.values,

					parent: contentEl,
				});

			renderer.render();
		}

		new Setting(contentEl)
			.addButton((button) => {
				button
					.setButtonText(
						"Create"
					)
					.setCta()
					.onClick(() => {
						this.handleCreate();
					});
			});
	}

	onClose(): void {
		this.contentEl.empty();
	}

	private handleCreate(): void {
		const row: TableRow = {
			id: crypto.randomUUID(),

			values: {
				...this.values,
			},
		};

		this.props.onCreate(row);

		this.close();
	}
}