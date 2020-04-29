let muted = false;

const toggleCurrent = () => {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        chrome.tabs.update(tabs[0].id, {muted: !tabs[0].mutedInfo.muted});
    });
}

const toggleAll = () => {
    muted = !muted;
    // "populate" each window object with a list of tabs as a property
    chrome.windows.getAll({populate: true}, windows => {
        windows.forEach(({tabs}) => {
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, {muted});
            });
        });
    });
}

chrome.commands.onCommand.addListener(command => {
    if (command === "mute_tab") {
        toggleCurrent();
    };

    if (command === "mute_all") {
        toggleAll();
    };

    if (command === "mute_except") {
        // this command is idempotent, unmuting all except current is undesirable
        muted = false;
        toggleAll()
        // wait for toggleAll to finish executing
        setTimeout(() => toggleCurrent(), 0);
    }
});