console.log('background loaded');

if (checkTime()) {
    browser.runtime.onStartup.addListener(() => {
        console.log('runtime added');
        addCloseAlarm();
    })

    browser.runtime.onInstalled.addListener(() => {
        console.log('install added');
        addCloseAlarm();
    })
}

const addCloseAlarm = () => {
    browser.alarms.create('closeDate', {
        delayInMinutes: 7
    })
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = changeInfo.url;
    if (!url) {
        return;
    }

    if (checkTime()) {
        if (changeInfo.url.indexOf('zombsroyale') != -1) {
            chrome.tabs.remove(tabId);
        }
    }
});


browser.alarms.onAlarm.addListener(async (alarmInfo) => {
    if (alarmInfo.name === 'closeDate') {
        const tabsToClose = [];
        const tabs = await browser.tabs.query({})
        console.log(tabs);
        tabs.forEach(element => {
            const id = element.id;
            tabsToClose.push(id);
        });
        browser.tabs.remove(tabsToClose);
    }
})

function checkTime() {
    const hour = new Date().getHours();
    //between 12 am and 3 pm
    const inRange = hour >= 0 && hour <= 15;
    return inRange;
}