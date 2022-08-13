import type { Instance } from "@popperjs/core";
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";

import type { generateGetBoundingClientRect } from "~libs/utilities";

export type MediaType = "image" | "gif" | "video";

export interface Replacer {
	regex: string;
	result: string;
	type: MediaType;
}

export interface MappedReplacer {
	website: string;
	index: number;
	replacer: Replacer; // Keeping this a property on its own instead of destructuring it to keep the hit of spreading minimal
}

export interface ReplacerAddition extends Replacer {
	website: string;
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
	virtualElement: VirtualElement;
	instance: Instance;
	setState: Dispatch<SetStateAction<PopupState | null>>;
}

export interface KeyUpProps {
	ev: KeyboardEvent;
	setState: Dispatch<SetStateAction<PopupState | null>>;
}

export interface MediaLoadProps {
	ev: SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>;
	state: PopupState | null;
	virtualElement: VirtualElement;
	instance: Instance;
	setState: Dispatch<SetStateAction<PopupState | null>>;
}

export interface Meta {}

export interface Migration {
	migrator: () => Promise<void>;
	version: string;
}
