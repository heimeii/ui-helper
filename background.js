chrome.runtime.onInstalled.addListener(() => {
    addListenerOmnibox();

    chrome.commands.onCommand.addListener(function(command) {
        active();
    });
});

function addListenerOmnibox() {
    const as = import('./commandMaps.js');
    as.then(item => console.log(item));
    chrome.omnibox.onInputStarted.addListener(() => {
        console.log('onInputStarted');
    });
    chrome.omnibox.onInputChanged.addListener(() => {
        console.log('onInputChanged');
    });
    chrome.omnibox.onInputEntered.addListener(() => {
        console.log('onInputEntered');
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
