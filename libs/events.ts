import browser from "webextension-polyfill";

import type {
	KeyUpProps,
	MouseMoveProps,
	Replacer,
	UpdateInstanceProps,
} from "~interfaces";

import { generateGetBoundingClientRect, subtreeHasTarget } from "./utilities";

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

export const onKeyUp = ({ setState }: KeyUpProps) => {
	setState(null);
};

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

		const url = new URL(src);
		const data = (await browser.storage.local.get(url.hostname)) as Replacer[];

		if (!data) return;

		const replacers = data[url.hostname];
		for (const replacer of replacers) {
			const regex = new RegExp(replacer.regex);
			if (!regex.test(src)) {
				// eslint-disable-next-line no-continue
				continue;
			}

			const replaced = src.replace(regex, replacer.result);
			setState({
				type: replacer.type,
				src: replaced,
				trigger: {
					x: ev.clientX,
					y: ev.clientY,
				},
			});
		}
	}, 500);
};
