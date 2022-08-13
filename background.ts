import semver from "semver";

import { websites } from "~libs/websites";
import migrations from "~migrations/index";

chrome.runtime.onInstalled.addListener(({ reason }) => {
	const isUpdateOrInstall =
		reason === chrome.runtime.OnInstalledReason.UPDATE ||
		reason === chrome.runtime.OnInstalledReason.INSTALL;

	if (isUpdateOrInstall) {
		chrome.tabs.create({
			url: chrome.runtime.getURL(
				chrome.runtime.getManifest().options_ui?.page as string
			),
		});
	}
});

chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
	const { version } = chrome.runtime.getManifest();
	const isUpdate = reason === chrome.runtime.OnInstalledReason.UPDATE;
	const isInstall = reason === chrome.runtime.OnInstalledReason.INSTALL;

	if (isUpdate) {
		console.log(
			`Detected update from version ${previousVersion} to ${version}`
		);

		const applicable = migrations
			.map((migration) => {
				if (semver.gt(migration.version, version)) {
					console.log(`Applying migration for version ${migration.version}`);

					return async () => migration.migrator();
				}

				return null;
			})
			.filter((migrator) => migrator !== null);

		if (applicable.length === 0) console.log("No applicable migrations found");

		for (const migrator of applicable) {
			const callable = migrator as () => Promise<void>;
			// eslint-disable-next-line no-await-in-loop
			await callable();
		}
	} else if (isInstall) {
		console.log(`Detected install for the first time, initializing storage`);

		await chrome.storage.local.set({
			meta: {},
			...websites,
		});
	}
});

export {};
