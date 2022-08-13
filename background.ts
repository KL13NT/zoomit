import semver from "semver";
import browser from "webextension-polyfill";

import { OnInstalledReason } from "~interfaces";
import { websites } from "~libs/websites";
import migrations from "~migrations/index";

browser.runtime.onInstalled.addListener(({ reason }) => {
	const isUpdateOrInstall =
		reason === OnInstalledReason.UPDATE || reason === OnInstalledReason.INSTALL;

	if (isUpdateOrInstall) {
		browser.tabs.create({
			url: browser.runtime.getURL(
				browser.runtime.getManifest().options_ui?.page as string
			),
		});
	}
});

browser.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
	const { version } = browser.runtime.getManifest();
	const isUpdate = reason === OnInstalledReason.UPDATE;
	const isInstall = reason === OnInstalledReason.INSTALL;

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

		await browser.storage.local.set({
			meta: {},
			...websites,
		});
	}
});

export {};
