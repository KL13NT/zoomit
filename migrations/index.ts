// import browser from "webextension-polyfill";
import type { Migration } from "~interfaces";

// NOTE: These comments are left here for future reference.

const migrations: Array<Migration> = [
	// {
	// 	version: "0.3.0",
	// 	migrator: async () => {
	// 		await browser.storage.local.set({
	// 			meta: {},
	// 			...websites,
	// 		});
	// 	},
	// },
];

export default migrations;
