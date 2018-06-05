let commandMaps;

chrome.runtime.onInstalled.addListener(() => {
    const importCommand = import('./commandMaps.js');
    importCommand.then(maps => {
        commandMaps = maps;
    });
    addListenerOmnibox();

    chrome.commands.onCommand.addListener(function(command) {
        active();
    });
});

function addListenerOmnibox() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'aaaaaaaa'
    });
    chrome.omnibox.onInputStarted.addListener(() => {
        
    });
    chrome.omnibox.onInputChanged.addListener((text, suggest) => {
        console.log('onInputChanged', text, suggest);
    });
    chrome.omnibox.onInputEntered.addListener((text, disposition) => {
        console.log('onInputEntered', text, disposition);
    });
}

function active() {
    chrome.tabs.insertCSS({
        file: 'insert.css',
    });
    chrome.tabs.executeScript({
        file: 'insert.js',
    });
}
