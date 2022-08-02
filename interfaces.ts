import type { Instance } from "@popperjs/core";
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";

import type { generateGetBoundingClientRect } from "~libs/utilities";

type MediaType = "image" | "gif" | "video";

export interface Replacer {
	regex: RegExp;
	result: string;
	type: MediaType;
}

interface VirtualElement {
	getBoundingClientRect: ReturnType<typeof generateGetBoundingClientRect>;
}

export interface UpdateInstanceProps {
	x: number;
	y: number;
	instance: Instance;
	virtualElement: VirtualElement;
}

type TriggerCoordinates = {
	x: number;
	y: number;
};

export interface PopupState {
	src: string;
	type: MediaType;
	trigger: TriggerCoordinates;
}

export interface MouseMoveProps {
	ev: MouseEvent;
	state: PopupState | null;
	virtualElement: VirtualElement;
	instance: Instance;
	setState: Dispatch<SetStateAction<PopupState | null>>;
}

export interface MediaLoadProps {
	ev: SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>;
	state: PopupState | null;
	virtualElement: VirtualElement;
	instance: Instance;
	setState: Dispatch<SetStateAction<PopupState | null>>;
}
