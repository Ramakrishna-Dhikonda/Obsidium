export const columns = [
  {
    id: "name",
    label: "Name",
    width: 260
  },

  {
    id: "status",
    label: "Status",
    width: 180
  },

  {
    id: "priority",
    label: "Priority",
    width: 160
  },

  {
    id: "assignee",
    label: "Assignee",
    width: 200
  },

  {
    id: "dueDate",
    label: "Due Date",
    width: 180
  }
];

export const rows = Array.from(
  { length: 100 },

  (_, index) => ({
    id: index,

    name: `Task ${index}`,

    status: "In Progress",

    priority: "High",

    assignee: "Ram",

    dueDate: "Today",
  })
);