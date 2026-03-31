const MODULE_ID = "UA2025-SubclassUpdates";

Hooks.once("init", () => {
	game.settings.register(MODULE_ID, "lastVersion", {
		name: "Last Version",
		hint: "The last version checked against to determine whether to show the subclass updates.",
		scope: "world",
		config: false,
		type: String,
		default: "1.0.0",
	});

	console.log("ua2025-subclass-updates.mjs hooked");
});

Hooks.once("ready", async () => {
	const currentVersion = game.modules.get(MODULE_ID).version;
	const lastVersion = game.settings.get(MODULE_ID, "lastVersion");
	if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
		const journal = await fromUuid(
			"Compendium.UA2025-SubclassUpdates.content.JournalEntry.uaChangelog00000",
		);
		const page = journal.pages.contents.at(-1);
		journal.sheet.render(true, { pageId: page.id });
		game.settings.set(MODULE_ID, "lastVersion", currentVersion);
	}
});
