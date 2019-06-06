// This is loaded via a script tag so it has direct access to the full context of the page
// Which means we can poke into the Ember router and open up tabs 😝
window.addEventListener("zmOpenTicket", function(evt) {
  window.Zd.router.handleURL("/tickets/" + evt.detail.ticketId);
}, false);

