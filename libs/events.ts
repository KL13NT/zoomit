import type { MouseMoveProps, UpdateInstanceProps } from "~interfaces";

import {
	generateGetBoundingClientRect,
	getReplacerFromSrc,
	subtreeHasTarget,
} from "./utilities";

export const updateInstance = ({
	x,
	y,
	instance,
	virtualElement,
}: UpdateInstanceProps) => {
	// eslint-disable-next-line no-param-reassign
	virtualElement.getBoundingClientRect = generateGetBoundingClientRect(x, y);

	instance.update();
};

let target: HTMLElement | null = null;
let timeout: NodeJS.Timeout | null = null;

export const onMouseMove = ({
	ev,
	instance,
	virtualElement,
	setState,
}: MouseMoveProps) => {
	const evTarget = ev.target as HTMLElement;

	updateInstance({
		x: ev.clientX,
		y: ev.clientY,
		instance,
		virtualElement,
	});

	if (
		target &&
		(evTarget === target ||
			subtreeHasTarget(instance.state.elements.popper, evTarget))
	) {
		return;
	}

	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}

	setState(null);

	target = evTarget;
	timeout = setTimeout(async () => {
		if (evTarget.tagName !== "IMG") return;

		const { src } = evTarget as HTMLImageElement;
		const replacer = await getReplacerFromSrc(src);

		if (!replacer) return;

		const { replacerIndex, src: replacerSrc, type } = replacer;

		setState({
			replacerIndex,
			type,
			original: src,
			src: replacerSrc,
			trigger: {
				x: ev.clientX,
				y: ev.clientY,
			},
		});
	}, 500);
};
