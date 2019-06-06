var masterTabId = null;

function onTabUpdated(tabId, changeInfo, tab) {
  if (!tab.url || tab.id === masterTabId ) { return }

  var rx = new RegExp(".zendesk.com/agent/tickets/(\\d+)")
  var match =  rx.exec(tab.url);
  if (match) {
    if(masterTabId === null) {
      masterTabId = tabId;
      return;
    }

    chrome.tabs.get(masterTabId, function(masterTab) {
      if (chrome.runtime.lastError) {
        // If there aren't other ZD tabs, use this one as the ZenMaster
        masterTabId = tabId;
        return;
      }

      // if the tab is already removed, don't remove it again
      chrome.tabs.remove(tabId, function() {
        if (chrome.runtime.lastError) {
          void chrome.runtime.lastError;
          return;
        }
        chrome.tabs.sendMessage(masterTabId, {openTicket: match[1]});
        chrome.tabs.update(masterTabId, {highlighted: true});
        chrome.windows.update(masterTab.windowId, {focused: true});
      })
    });
  }
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(onTabUpdated);
});