import { setIcon } from "obsidian";

interface TableToolbarProps {
	onCreateRowClick: () => void;

	onColumnVisibilityClick: (
		event: MouseEvent
	) => void;

	onDateFilterClick: () => void;

	showDateFilter: boolean;

	dateFilterLabel: string | null;

	hasActiveDateFilter: boolean;
}

export class TableToolbar {
	constructor(
		private props: TableToolbarProps
	) {}

	render(parent: HTMLElement): void {
		const toolbar = parent.createDiv({
			cls: "obsidium-table-toolbar",
		});

		const leftActions = toolbar.createDiv({
			cls: "obsidium-table-toolbar-section",
		});

		const rightActions = toolbar.createDiv({
			cls: "obsidium-table-toolbar-section",
		});
        if (this.props.showDateFilter) {
            const dateFilterButton =
                rightActions.createDiv({
                    cls: `obsidium-table-date-filter-button ${
                        this.props.hasActiveDateFilter
                            ? "is-active"
                            : ""
                    }`,
                });

            setIcon(
                dateFilterButton,
                "calendar-days"
            );

            dateFilterButton.createSpan({
                text:
                    this.props.dateFilterLabel ??
                    "Filter Dates",
            });

            dateFilterButton.addEventListener(
                "click",
                () => {
                    this.props.onDateFilterClick();
                }
            );
        }
		/* this.createIconButton(
			leftActions,
			"plus",
			() => {
				this.props.onCreateRowClick();
			}
		);

		this.createIconButton(
			leftActions,
			"filter"
		);

		this.createIconButton(
			leftActions,
			"arrow-up-down"
		); */

		this.createIconButton(
			rightActions,
			"columns-3",
			this.props.onColumnVisibilityClick
		);

		this.createIconButton(
			rightActions,
			"sliders-horizontal"
		);
	}

	private createIconButton(
		parent: HTMLElement,
		icon: string,
		onClick?: (
			event: MouseEvent
		) => void
	): void {
		const button = parent.createDiv({
			cls: "clickable-icon obsidium-table-toolbar-button",
		});

		setIcon(button, icon);

		if (onClick) {
			button.addEventListener(
				"click",
				onClick
			);
		}
	}
}