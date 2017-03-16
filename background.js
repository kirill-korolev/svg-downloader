var isEnabled = true;

var icons = {
  disabled:"icon481.png",
  active:"icon48.png"
};

sendMessage(isEnabled);

chrome.browserAction.onClicked.addListener(function(tab) {

  if(isEnabled){
    isEnabled = false;
    chrome.browserAction.setIcon({
      path:icons.disabled
    });
  }
  else{
    chrome.browserAction.setIcon({
      path:icons.active
    });

    isEnabled = true;
  }

  sendMessage(isEnabled);

});


function sendMessage(isEnabled){
    var tabId;
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, {isEnabled: isEnabled});
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendRespons)
{
    document.body.innerHTML += request.data;

    var svg = document.querySelector('svg');
    svg.setAttribute('id', "icon_" + randomizeString());

    var e = document.createElement('script');
    e.setAttribute('src', 'https://nytimes.github.io/svg-crowbar/svg-crowbar.js');
    e.setAttribute('class', 'svg-crowbar');
    document.body.appendChild(e);
});

function randomizeString(){
    return getRandom(0, 999999).toString();
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1) + min);
}
