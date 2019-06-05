console.log("On a zendesk page")
// if (!global.masterTab) {
//   chrome.tabs.create({"url": "https://mobiledoorman.zendesk.com"}, function(tab) {
//     global.masterTab = tab;
//   });
// } else {
//   alert("Master Tab already exists");
// }
// $(document).ready(function() {
//   debugger
//   window.Zd.router.handleURL("/tickets/2371")
// });

var jsInitChecktimer = setInterval (checkForJS_Finish, 1111);

function checkForJS_Finish () {
  console.log("ZM interval")
  if ( typeof window.Zd !== "undefined" ) {
      clearInterval(jsInitChecktimer);
  }
}

window.addEventListener("zmOpenTicket", function(evt) {
  /* message is in evt.detail */
  window.Zd.router.handleURL("/tickets/" + evt.detail.ticketId);
}, false);

