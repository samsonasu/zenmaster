/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
injectScript(chrome.extension.getURL('onpage.js'), 'body');

// // Find the right tab
// setTimeout(function() {
//     //Page context
//     alert("FIRE")
//     var message = {test: "blah"};
//     var event = new CustomEvent("zmOpenTicket", {detail: message});
//     window.dispatchEvent(event);
// }, 5000);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.openTicket) {
            var event = new CustomEvent("zmOpenTicket", {
                detail: {
                    ticketId: request.openTicket
                }
            });
            window.dispatchEvent(event);
        }
    }
);
