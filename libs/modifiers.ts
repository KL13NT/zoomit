export const preventOverflowModifier = {
	name: "preventOverflow",
	enabled: true,
	options: {
		rootBoundary: "viewport",
		mainAxis: true, // true by default
		altAxis: true, // false by default
		padding: 8,
		tether: false, // true by default
	},
};
