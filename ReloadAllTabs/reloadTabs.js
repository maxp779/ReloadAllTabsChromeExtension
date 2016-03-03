var queryInfo = {};

//react when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function (tab) {
    //chrome.extension.getBackgroundPage().console.log('reloading all tabs!');

    getQueryInfo(function () {
        reloadTabs();
    });

})

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        console.log("This is a first install!");
        setupDefaults();
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        setupDefaults();
    }
});


function getQueryInfo(callback)
{
    chrome.storage.sync.get(
     function (items) {
         if (items.currentWindow === 'true') {
             queryInfo = {currentWindow: true};
         }
         else
         {
             queryInfo = {};
         }

         if(callback)
         {
             callback();
         }
     });
}

function reloadTabs()
{
    chrome.tabs.query(queryInfo, function (tabs) {
        for (var index = 0; index <= tabs.length - 1; index++) {
            chrome.tabs.reload(tabs[index].id);
        }
    });
}

function setupDefaults()
{
    chrome.storage.sync.set({
        currentWindow: 'true',
    });
}