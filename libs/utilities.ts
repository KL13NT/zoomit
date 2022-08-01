/* eslint-disable indent */
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
