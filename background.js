var globalTabId = null;

chrome.runtime.onInstalled.addListener(function() {
  // chrome.webRequest.onBeforeRequest.addListener(
  //   function(details) {
  //     if ( details.url.indexOf("://mobiledoorman.zendesk.com/agent") ) {
  //       //Page context
  //       var event = new CustomEvent("zmOpenTicket", {
  //         detail: {
  //           ticketId: 1234
  //         }
  //       });
  //       window.dispatchEvent(event);
  //     }
  //   },
  //   {urls: ["<all_urls>"]},
  //   ["blocking"]
  // );

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (!tab.url || tabId === globalTabId) { return }
    var rx = new RegExp("https:\/\/mobiledoorman.zendesk.com/agent/tickets/(\\d+)")
    if (match = rx.exec(tab.url)) {
      // We're in a ZD tab
      if (globalTabId !== null && globalTabId !== tabId) {
        chrome.tabs.sendMessage(globalTabId, {openTicket: match[1]});
        chrome.tabs.remove(tabId);
        chrome.tabs.update(globalTabId, {highlighted: true});
      } else {
        // If there aren't other ZD tabs, use this one
        globalTabId = tabId
      }
    }
  });
  alert("bg created")
});