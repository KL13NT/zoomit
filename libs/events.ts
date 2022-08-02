import type { MouseMoveProps, UpdateInstanceProps } from "~interfaces";

import { generateGetBoundingClientRect } from "./utilities";
import { websites } from "./websites";

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
	state,
	instance,
	virtualElement,
	setState,
}: MouseMoveProps) => {
	const evTarget = ev.target as HTMLElement;

	if (evTarget === target) {
		return;
	}

	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}

	if (state) setState(null);

	target = evTarget;
	timeout = setTimeout(() => {
		if (evTarget.tagName !== "IMG") return;

		const { src } = evTarget as HTMLImageElement;

		const url = new URL(src);
		const replacers = websites[url.hostname];

		for (const replacer of replacers) {
			if (!replacer.regex.test(src)) {
				// eslint-disable-next-line no-continue
				continue;
			}

			const replaced = src.replace(replacer.regex, replacer.result);
			setState({
				type: replacer.type,
				src: replaced,
				trigger: {
					x: ev.clientX,
					y: ev.clientY,
				},
			});
		}

		const onTargetMouseMove = (targetMouseMoveEvent: MouseEvent) =>
			updateInstance({
				x: targetMouseMoveEvent.clientX,
				y: targetMouseMoveEvent.clientY,
				instance,
				virtualElement,
			});

		const onTargetMouseLeave = () => {
			setState(null);

			evTarget.removeEventListener("mouseleave", onTargetMouseLeave);
			evTarget.removeEventListener("mousemove", onTargetMouseMove);
		};

		evTarget.addEventListener("mousemove", onTargetMouseMove);
		evTarget.addEventListener("mouseleave", onTargetMouseLeave);
	}, 500);
};
