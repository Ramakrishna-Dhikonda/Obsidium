import {
	ItemView,
	WorkspaceLeaf,
	setIcon,
} from "obsidian";

import { OBSIDIUM_VIEW_TYPE } from "../../core/constants/view";

import { OBSIDIUM_NAV_ITEMS } from "./types/navigation";

import {
	ObsidiumPage,
	SidebarNavItem,
} from "./types/navigation";

export class ObsidiumView extends ItemView {
	private activePage: ObsidiumPage = "tables";

	private sidebarCollapsed = false;

	private workspaceContentEl!: HTMLDivElement;

	private navContainerEl!: HTMLDivElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return OBSIDIUM_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "Obsidium";
	}

	getIcon(): string {
		return "layout-dashboard";
	}

	async onOpen(): Promise<void> {
		this.contentEl.empty();

		this.contentEl.addClass("obsidium-view");

		this.renderLayout();
	}

	async onClose(): Promise<void> {}

	/**
	 * Root layout renderer
	 */
	private renderLayout(): void {
		const layoutEl = this.contentEl.createDiv({
			cls: "obsidium-layout",
		});

		const sidebarEl =
			this.renderSidebar(layoutEl);

		this.renderWorkspace(layoutEl);

		this.updateSidebarState(sidebarEl);

		this.renderWorkspacePage();
	}

	/**
	 * Sidebar renderer
	 */
	private renderSidebar(
		parent: HTMLElement
	): HTMLDivElement {
		const sidebarEl = parent.createDiv({
			cls: "obsidium-sidebar",
		});

		this.renderSidebarHeader(sidebarEl);

		this.navContainerEl =
			sidebarEl.createDiv({
				cls: "obsidium-nav",
			});

		this.renderNavigationItems();

		return sidebarEl;
	}

	/**
	 * Sidebar header renderer
	 */
	private renderSidebarHeader(
		parent: HTMLElement
	): void {
		const headerEl = parent.createDiv({
			cls: "obsidium-sidebar-header",
		});

		headerEl.createDiv({
			text: "Obsidium",
			cls: "obsidium-sidebar-title",
		});

		const toggleButton =
			headerEl.createDiv({
				cls: "clickable-icon obsidium-sidebar-toggle",
			});

		setIcon(toggleButton, "panel-left-close");

		toggleButton.addEventListener(
			"click",
			() => {
				this.sidebarCollapsed =
					!this.sidebarCollapsed;

				const sidebar =
					this.contentEl.querySelector(
						".obsidium-sidebar"
					);

				if (!sidebar) {
					return;
				}

				this.updateSidebarState(
					sidebar as HTMLDivElement
				);

				setIcon(
					toggleButton,
					this.sidebarCollapsed
						? "panel-left-open"
						: "panel-left-close"
				);
			}
		);
	}

	/**
	 * Navigation items renderer
	 */
	private renderNavigationItems(): void {
		this.navContainerEl.empty();

		for (const item of OBSIDIUM_NAV_ITEMS) {
			this.renderNavigationItem(item);
		}
	}

	private renderNavigationItem(
		item: SidebarNavItem
	): void {
		const isActive =
			item.id === this.activePage;

		const navItem =
			this.navContainerEl.createDiv({
				cls: `obsidium-nav-item ${
					isActive ? "is-active" : ""
				}`,
			});

		const iconEl = navItem.createDiv();

		setIcon(iconEl, item.icon);

		navItem.createSpan({
			text: item.label,
			cls: "obsidium-nav-label",
		});

		navItem.addEventListener(
			"click",
			() => {
				if (
					this.activePage === item.id
				) {
					return;
				}

				this.activePage = item.id;

				this.renderNavigationItems();

				this.renderWorkspacePage();
			}
		);
	}

	/**
	 * Workspace renderer
	 */
	private renderWorkspace(
		parent: HTMLElement
	): void {
		const workspaceEl =
			parent.createDiv({
				cls: "obsidium-workspace",
			});

		this.workspaceContentEl =
			workspaceEl.createDiv({
				cls: "obsidium-workspace-content",
			});
	}

	/**
	 * Dynamic page renderer
	 */
	private renderWorkspacePage(): void {
		this.workspaceContentEl.empty();

		switch (this.activePage) {
			case "tables":
				this.renderTablesPage();
				break;

			case "boards":
				this.renderBoardsPage();
				break;

			case "calendar":
				this.renderCalendarPage();
				break;
		}
	}

	private renderTablesPage(): void {
		this.renderPage(
			"Tables Page",
			"Future database and table systems will render here."
		);
	}

	private renderBoardsPage(): void {
		this.renderPage(
			"Boards Page",
			"Future Kanban systems will render here."
		);
	}

	private renderCalendarPage(): void {
		this.renderPage(
			"Calendar Page",
			"Future scheduling and calendar systems will render here."
		);
	}

	/**
	 * Shared placeholder page renderer
	 */
	private renderPage(
		title: string,
		description: string
	): void {
		this.workspaceContentEl.createEl("h2", {
			text: title,
			cls: "obsidium-page-title",
		});

		this.workspaceContentEl.createEl("p", {
			text: description,
			cls: "obsidium-page-description",
		});
	}

	/**
	 * Sidebar state updater
	 */
	private updateSidebarState(
		sidebarEl: HTMLDivElement
	): void {
		sidebarEl.toggleClass(
			"is-collapsed",
			this.sidebarCollapsed
		);
	}
}