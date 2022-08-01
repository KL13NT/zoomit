import type { Instance } from "@popperjs/core";

import type { generateGetBoundingClientRect } from "~libs/utilities";

export interface Replacer {
	regex: RegExp;
	result: string;
	type: "image" | "gif" | "video";
}

interface VirtualElement {
	getBoundingClientRect: ReturnType<typeof generateGetBoundingClientRect>;
}

export interface MouseMoveProps {
	ev: MouseEvent;
	source: string | null;
	virtualElement: VirtualElement;
	instance: Instance;
	setSrc: Function;
	setMode: Function;
}

export interface UpdateInstanceProps {
	x: number;
	y: number;
	instance: Instance;
	virtualElement: VirtualElement;
}
