chrome.runtime.onInstalled.addListener(function () {
    chrome.commands.onCommand.addListener(function(command) {
        active();
    });
});

function active() {
    chrome.tabs.executeScript({
        file: 'insert.js',
    });
    chrome.tabs.executeScript({
        file: 'insert.css',
    });
}
