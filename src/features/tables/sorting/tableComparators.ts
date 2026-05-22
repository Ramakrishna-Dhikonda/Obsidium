const PRIORITY_ORDER = [
	"Critical",
	"High",
	"Medium",
	"Low",
];

const STATUS_ORDER = [
	"Planned",
	"In Progress",
	"Review",
	"Completed",
];

export const tableComparators = {
	number: (
		a: unknown,
		b: unknown
	): number => {
		return Number(a) - Number(b);
	},

	date: (
		a: unknown,
		b: unknown
	): number => {
		return (
			new Date(String(a)).getTime() -
			new Date(String(b)).getTime()
		);
	},

	priority: (
		a: unknown,
		b: unknown
	): number => {
		return (
			PRIORITY_ORDER.indexOf(
				String(a)
			) -
			PRIORITY_ORDER.indexOf(
				String(b)
			)
		);
	},

	status: (
		a: unknown,
		b: unknown
	): number => {
		return (
			STATUS_ORDER.indexOf(
				String(a)
			) -
			STATUS_ORDER.indexOf(
				String(b)
			)
		);
	},
};