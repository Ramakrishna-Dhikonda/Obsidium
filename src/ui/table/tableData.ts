import { ColumnType } from "./types";

export interface Column {
  id: string;
  label: string;
  width: number;
  type: ColumnType;
}

export const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    width: 260,
    type: "text"
  },

  {
    id: "status",
    label: "Status",
    width: 180,
    type: "select"
  },

  {
    id: "priority",
    label: "Priority",
    width: 160,
    type: "priority"
  },

  {
    id: "assignee",
    label: "Assignee",
    width: 200,
    type: "text"
  },

  {
    id: "dueDate",
    label: "Due Date",
    width: 180,
    type: "date"
  }
]

export const rows = Array.from(
  { length: 100 },

  (_, index) => ({
    id: index,

    name: `Task ${index}`,

    status: "Todo",

    priority: "Low",

    assignee: "Ram",

    dueDate: "2026-05-19",
  })
);