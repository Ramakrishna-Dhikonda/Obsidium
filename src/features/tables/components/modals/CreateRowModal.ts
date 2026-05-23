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

        contentEl.addClass(
            "obsidium-create-row-modal"
        );

        /**
         * Header
         */
        const headerEl =
            contentEl.createDiv({
                cls: "obsidium-modal-header",
            });

        headerEl.createEl("h2", {
            text: "Create Row",
        });

        headerEl.createEl("p", {
            text: "Add a new record to the table",
            cls: "obsidium-modal-subtitle",
        });

        /**
         * Scrollable body
         */
        const bodyEl =
            contentEl.createDiv({
                cls: "obsidium-modal-body",
            });

        const formGrid =
            bodyEl.createDiv({
                cls: "obsidium-form-grid",
            });

        for (const column of this
            .props.columns) {
            const fieldWrapper =
                formGrid.createDiv({
                    cls: "obsidium-form-field",
                });

            const renderer =
                new TableFieldRenderer({
                    column,

                    values: this.values,

                    parent: fieldWrapper,
                });

            renderer.render();
        }

        /**
         * Sticky footer
         */
        const footerEl =
            contentEl.createDiv({
                cls: "obsidium-modal-footer",
            });

        new Setting(footerEl)
            .setClass(
                "obsidium-modal-actions"
            )
            .addButton((button) => {
                button
                    .setButtonText(
                        "Cancel"
                    )
                    .onClick(() => {
                        this.close();
                    });
            })
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