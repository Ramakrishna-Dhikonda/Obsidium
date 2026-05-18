import type {
  LucideIcon
} from "lucide-solid";

import {
    LayoutGrid,
    Table,
    KanbanSquare,
    CalendarDays,
    NotebookPen,
    Settings
} from "lucide-solid";

export interface NavigationItem {
    
    id: string;
    label: string;
    icon: LucideIcon;

}

export const navigationItems:
    NavigationItem[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutGrid
        },

        {
            id: "tables",
            label: "Tables",
            icon: Table
        },

        {
            id: "boards",
            label: "Boards",
            icon: KanbanSquare
        },

        {
            id: "calendar",
            label: "Calendar",
            icon: CalendarDays
        },

        {
            id: "notes",
            label: "Notes",
            icon: NotebookPen
        },

        {
            id: "settings",
            label: "Settings",
            icon: Settings
        }
    ];