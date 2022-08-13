import { createPopper } from "@popperjs/core";
import cssText from "data-text:./contents.css";
import type { PlasmoContentScript } from "plasmo";
import { useEffect, useRef, useState } from "react";

import type { PopupState } from "~interfaces";
import { onKeyUp, onMouseMove } from "~libs/events";
import { preventOverflowModifier } from "~libs/modifiers";
import {
	createRootContainer,
	createStyleSheet,
	generateGetBoundingClientRect,
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
	placement: "auto",
	strategy: "fixed",
	modifiers: [preventOverflowModifier],
});

const resizeObserver = new ResizeObserver(() => {
	instance.update();
});

function Popup() {
	const [state, setState] = useState<PopupState | null>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		document.addEventListener("keyup", (ev) => onKeyUp({ ev, setState }));
		document.addEventListener("mousemove", (ev) =>
			onMouseMove({
				ev,
				instance,
				virtualElement,
				setState,
			})
		);
	}, []);

	useEffect(() => {
		if (imageRef.current && !imageRef.current.dataset.observed) {
			resizeObserver.observe(imageRef.current);
			imageRef.current.dataset.observed = "true";
		}

		if (videoRef.current && !videoRef.current.dataset.observed) {
			resizeObserver.observe(videoRef.current);
			videoRef.current.dataset.observed = "true";
		}
	}, [state]);

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<video
				src={state?.src}
				ref={videoRef}
				className="imagus-popup-image"
				style={{
					display: state?.src && state.type !== "image" ? "initial" : "none",
				}}
				autoPlay
				loop
			/>
			<img
				src={state?.src}
				ref={imageRef}
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
