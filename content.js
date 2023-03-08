var selectedText = "";

document.addEventListener("mouseup", function (event) {
  selectedText = window.getSelection().toString();

  console.log(event.pageX + 7, event.pageY + 7)

  // console.log( window.getSelection().focusNode.parentNode)

  console.log("selectedText:", selectedText);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "getSelectedText") {
    sendResponse({ selectedText: selectedText });
  }
});
