import { detectOverflow } from "@popperjs/core";

export const preventOverflowModifier = {
	name: "preventOverflow",
	enabled: true,
	options: {
		rootBoundary: "viewport",
	},
};

export const maxSizeModifier = {
	name: "maxSize",
	enabled: true,
	phase: "main",
	requiresIfExists: ["offset", "preventOverflow"],
	fn({ state, name }) {
		const overflow = detectOverflow(state);
		const { x, y } = state.modifiersData.preventOverflow || { x: 0, y: 0 };
		const { width, height } = state.rects.popper;
		const [basePlacement] = state.placement.split("-");

		const widthProp = basePlacement === "left" ? "left" : "right";
		const heightProp = basePlacement === "top" ? "top" : "bottom";

		// eslint-disable-next-line no-param-reassign
		state.modifiersData[name] = {
			width: width - overflow[widthProp] - x,
			height: height - overflow[heightProp] - y,
		};
	},
};

export const applyMaxSizeModifier = {
	name: "applyMaxSize",
	enabled: true,
	phase: "beforeWrite",
	requires: ["maxSize"],
	fn({ state }) {
		const { width, height } = state.modifiersData.maxSize;

		document.documentElement.style.setProperty(
			"--max-imagus-width",
			`${width}px`
		);
		document.documentElement.style.setProperty(
			"--max-imagus-height",
			`${height}px`
		);

		// eslint-disable-next-line no-param-reassign
		state.styles.popper = {
			...state.styles.popper,
			maxHeight: `${height}px`,
			maxWidth: `${width}px`,
		};
	},
};
