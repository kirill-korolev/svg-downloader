var isEnabled = true;
var svg = document.querySelector('.icon-preview__svg');

svg.addEventListener("click", function(){

    if(isEnabled){
        var data = svg.innerHTML;
        chrome.runtime.sendMessage({data: data});
    }

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.isEnabled){
      isEnabled = true;
    }
    else{
      isEnabled = false;
    }
});
