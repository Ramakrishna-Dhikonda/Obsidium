export type ObsidiumPage =
	| "tables"
	| "boards"
	| "calendar";

export interface SidebarNavItem {
	id: ObsidiumPage;
	label: string;
	icon: string;
}

export const OBSIDIUM_NAV_ITEMS: SidebarNavItem[] = [
	{
		id: "tables",
		label: "Tables",
		icon: "table",
	},
	{
		id: "boards",
		label: "Boards",
		icon: "kanban-square",
	},
	{
		id: "calendar",
		label: "Calendar",
		icon: "calendar-days",
	},
];