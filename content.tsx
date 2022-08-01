import { createPopper } from "@popperjs/core";
import cssText from "data-text:./contents.css";
import type { PlasmoContentScript } from "plasmo";
import { useEffect, useState } from "react";

import { onMouseMove } from "~libs/events";
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

console.log("Injecting into page");

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
	const [src, setSrc] = useState<string | null>(null);
	const [mode, setMode] = useState<"video" | "image">("image");

	useEffect(() => {
		const debouncedMouseMoveHandler = throttle(
			this,
			(ev: MouseEvent) =>
				onMouseMove({
					ev,
					instance,
					setSrc,
					setMode,
					source: src,
					virtualElement,
				}),
			50
		);

		document.addEventListener("mousemove", debouncedMouseMoveHandler);
	}, []);

	if (mode === "video")
		return (
			// eslint-disable-next-line jsx-a11y/media-has-caption
			<video
				src={src}
				className="imagus-popup-image"
				style={{ display: src ? "initial" : "none" }}
				autoPlay
				loop
			/>
		);

	return (
		<img
			className="imagus-popup-image"
			style={{ display: src ? "initial" : "none" }}
			src={src}
			alt=""
			role="presentation"
		/>
	);
}

export const getRootContainer = () =>
	document.querySelector(".imagus-popup-container");

export default Popup;
