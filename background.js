// check for a the aws login-success lage and close the tab

// matches https://foo.awsapps.com/start/user-consent/login-success.html

var regex = /^https:\/\/\w+\.awsapps\.com\/start\/user-consent\/login-success\.html$/

function closeUserConsentTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (regex.test(changeInfo.url)) {
            browser.tabs.remove(tabId);
        }
    }
}

browser.tabs.onUpdated.addListener(closeUserConsentTab);
