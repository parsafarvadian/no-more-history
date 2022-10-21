chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        extEnabled: false,
        lastVisitedURL: "null"
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get('extEnabled', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            chrome.storage.local.get('lastVisitedURL', data2 => {
                let modifiedURL = `${tab.url}`.split("://")[1].split("/")[0]
                console.log(modifiedURL)

                let lastVisitedURL = `${data2.lastVisitedURL}`
                
                if(data.extEnabled == true)
                {
                    if(modifiedURL != lastVisitedURL)
                    {
                        chrome.history.deleteAll(function() {
                            console.log("Successfully cleared history.")
                        });
                    }
                }
    
                chrome.storage.local.set({
                    extEnabled: data.extEnabled,
                    lastVisitedURL: modifiedURL
                });
            });
        });
        // chrome.scripting.insertCSS({
        //     target: { tabId: tabId },
        //     files: ["./foreground_styles.css"]
        // })
        //     .then(() => {
        //         console.log("INJECTED THE FOREGROUND STYLES.");

        //         chrome.scripting.executeScript({
        //             target: { tabId: tabId },
        //             files: ["./foreground.js"]
        //         })
        //             .then(() => {
        //                 console.log("INJECTED THE FOREGROUND SCRIPT.");
        //             });
        //     })
        //     .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_lvurl') {
        chrome.storage.local.get('lastVisitedURL', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            console.log("lastVisitedURL read as " + data.extEnabled)

            sendResponse({
                message: 'success',
                payload: data.lastVisitedURL
            });
        });

        return true;
    }

    if (request.message === 'get_enabled') {
        chrome.storage.local.get('extEnabled', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            console.log("extEnabled read as " + data.extEnabled)

            sendResponse({
                message: 'success',
                payload: data.extEnabled
            });
        });

        return true;
    }

    if (request.message === 'set_enabled_true') {
        chrome.storage.local.set({
            extEnabled: true
        });
        chrome.storage.local.get('extEnabled', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            console.log("extEnabled set to " + data.extEnabled)

            sendResponse({
                message: 'success',
                payload: data.extEnabled
            });
        });

        return true;
    }

    if (request.message === 'set_enabled_false') {
        chrome.storage.local.set({
            extEnabled: false
        });
        chrome.storage.local.get('extEnabled', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            console.log("extEnabled set to " + data.extEnabled)

            sendResponse({
                message: 'success',
                payload: data.extEnabled
            });
        });

        return true;
    }

    return false;
});