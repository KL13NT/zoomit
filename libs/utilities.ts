/* eslint-disable indent */
import browser from "webextension-polyfill";

import type { Replacer, ReplacerAddition } from "~interfaces";

const excludes = ["meta"];

export const throttle = (
	context: ThisType<Window>,
	func: Function,
	limit: number
) => {
	let lastFunc: NodeJS.Timeout;
	let lastRan: number;

	return (...args: unknown[]) => {
		if (!lastRan) {
			lastRan = Date.now();
			func.apply(context, args);
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(() => {
				if (Date.now() - lastRan >= limit) {
					func.apply(context, args);
					lastRan = Date.now();
				}
			}, limit - (Date.now() - lastRan));
		}
	};
};

export const createRootContainer = () => {
	const container = document.createElement("div");
	container.classList.add("imagus-popup-container");

	document.body.appendChild(container);

	return container;
};

export const createStyleSheet = (cssText: string) => {
	const style = document.createElement("style");
	style.textContent = cssText;
	document.body.appendChild(style);
};

export const generateGetBoundingClientRect =
	(x = 0, y = 0) =>
	() => ({
		width: 0,
		height: 10,
		top: y,
		right: x,
		bottom: y,
		left: x,
	});

export const subtreeHasTarget = (parent: Element, target: HTMLElement) => {
	if (parent === target) return true;

	const children = Array.from(parent.children);

	for (const child of children) {
		if (child === target) return true;
		if (child.children.length > 0) return subtreeHasTarget(child, target);
	}

	return false;
};

export const removeWebsiteFromStorage = async (
	website: string,
	index: number
) => {
	const data = (await browser.storage.local.get(website)) as Record<
		string,
		Replacer[]
	>;

	const modified = {
		[website]: data[website].filter((replacer, i) => i !== index),
	};

	await browser.storage.local.set({
		...modified,
	});
};

export const addWebsiteToStorage = async ({
	website,
	...replacer
}: ReplacerAddition) => {
	const data = (await browser.storage.local.get(website)) as Record<
		string,
		Replacer[]
	>;

	if (!data[website]) {
		await browser.storage.local.set({
			[website]: replacer,
		});
	} else {
		await browser.storage.local.set({
			[website]: [...data[website], replacer],
		});
	}
};

export const loadWebsitesFromStorage = async () => {
	const data = (await browser.storage.local.get()) as Record<
		string,
		Replacer[]
	>;

	return Object.keys(data)
		.filter((key) => !excludes.includes(key))
		.map((key) => {
			const replacers = data[key];

			return replacers.map((replacer, index) => ({
				replacer,
				website: key,
				index,
			}));
		})
		.flat();
};
