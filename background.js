// check for a the aws login-success lage and close the tab

// matches https://foo.awsapps.com/start/user-consent/login-success.html

var url_regex = /^https:\/\/\w+\.awsapps\.com\/start\//;

let alarm_running = false;

function restartAlarm(tab_id) {
    if (!alarm_running) {
        alarm_running = true;
        browser.alarms.clearAll();
        // 200 ms from now
        const when = Date.now() + 200;
        browser.alarms.create("tab-" + tab_id, {when});
    }
};

function closeUserConsentTab(tab_id, change_info, tab) {
    if (change_info.url &&
        url_regex.test(change_info.url)) {
        restartAlarm(tab_id);
    }
}

browser.tabs.onUpdated.addListener(closeUserConsentTab);

browser.alarms.onAlarm.addListener((alarm) => {
    alarm_running = false;
    browser.find.find("Request approved").then((found) => {
        const tab_id = parseInt(alarm.name.split("-")[1]);
        if (found.count == 1) {
            browser.tabs.remove(tab_id);
        } else {
            restartAlarm(tab_id);
        }
    });

  });
