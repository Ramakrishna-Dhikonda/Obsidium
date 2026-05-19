// New type for navigation state
import type {
  LucideIcon
} from "lucide-solid";

import {
  LayoutDashboard,
  Table,
  Calendar,
  Settings,
  TableProperties
} from "lucide-solid";

import type {
  WorkspaceView
} from "../types/view";

export interface NavigationItem {
  id: WorkspaceView;
  label: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [

  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },

  {
    id: "tables",
    label: "Tables",
    icon: TableProperties
  },

  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings
  }
];