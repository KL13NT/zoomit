import { createPopper } from "@popperjs/core";
import cssText from "data-text:./contents.css";
import type { PlasmoContentScript } from "plasmo";
import { useEffect, useState } from "react";

import type { PopupState } from "~interfaces";
import { onMouseMove, updateInstance } from "~libs/events";
import {
	applyMaxSizeModifier,
	maxSizeModifier,
	preventOverflowModifier,
} from "~libs/modifiers";
import {
	createRootContainer,
	createStyleSheet,
	generateGetBoundingClientRect,
	throttle,
} from "~libs/utilities";

export const config: PlasmoContentScript = {
	matches: ["<all_urls>"],
	all_frames: true,
};

createStyleSheet(cssText);
const container = createRootContainer();

const virtualElement = {
	getBoundingClientRect: generateGetBoundingClientRect(),
};

// @ts-ignore
const instance = createPopper(virtualElement, container, {
	modifiers: [preventOverflowModifier, maxSizeModifier, applyMaxSizeModifier],
});

function Popup() {
	const [state, setState] = useState<PopupState | null>(null);

	useEffect(() => {
		const debouncedMouseMoveHandler = throttle(
			this,
			(ev: MouseEvent) =>
				onMouseMove({
					ev,
					instance,
					state,
					virtualElement,
					setState,
				}),
			50
		);

		document.addEventListener("mousemove", debouncedMouseMoveHandler);
	}, []);

	useEffect(() => {
		if (!state) return;

		updateInstance({
			x: state.trigger.x,
			y: state.trigger.y,
			instance,
			virtualElement,
		});
	}, [state]);

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<video
				src={state?.src}
				className="imagus-popup-image"
				style={{
					display: state?.src && state.type !== "image" ? "initial" : "none",
				}}
				autoPlay
				loop
			/>
			<img
				src={state?.src}
				className="imagus-popup-image"
				style={{ display: state?.src ? "initial" : "none" }}
				alt=""
				role="presentation"
			/>
		</>
	);
}

export const getRootContainer = () =>
	document.querySelector(".imagus-popup-container");

export default Popup;
