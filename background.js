chrome.commands.onCommand.addListener(command => {
    if (command === "mute_tab") {
        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
            chrome.tabs.update(tabs[0].id, {muted: !tabs[0].mutedInfo.muted});
        });
    };
});