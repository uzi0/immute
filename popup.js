
chrome.commands.getAll(commands => {
    // display user's actual shortcuts in popup
    commands.forEach(command => {
        const shortcut = document.getElementById(command["name"]);
        shortcut && (shortcut.innerHTML = command["shortcut"]);
    });
});

// provide a direct clickable link to edit shortcut within popup
document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById("customize");
    link.addEventListener("click", () => chrome.tabs.create({active:true, url: "chrome://extensions/shortcuts"}));
});