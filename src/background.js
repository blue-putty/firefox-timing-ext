console.log('background loaded');
browser.runtime.onStartup.addListener(() => {
    console.log('runtime added');
    addCloseAlarm();
})

browser.runtime.onInstalled.addListener(() => {
    console.log('install added');
    addCloseAlarm();
})

const addCloseAlarm = () => {
    browser.alarms.create('closeDate', {
        delayInMinutes: 7
    })
}

browser.alarms.onAlarm.addListener(async (alarmInfo) => {
    if (alarmInfo.name === 'closeDate') {

        const tabsToClose = [];
        const tabs = await browser.tabs.query({})
        console.log(tabs);
        tabs.forEach(element => {
            const id = element.id;
            browser.tabs.executeScript(id, {code: preventClose.toString()});
            tabsToClose.push(id);
        });
        browser.tabs.remove(tabsToClose);
    }
})

const preventClose = () => {
    window.onbeforeunload = null;
}