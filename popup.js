var executeParams  = {};

var executeDetails = function(params) {
  
    const CONFIG = {
      JIRA_URL : "https://jira.app.gittigidiyor.net/",
      ENDPOINT : {
        ISSUES : "rest/greenhopper/1.0/xboard/work/allData.json"
      }
    };

    var urlParams     = new URLSearchParams(window.location.search);
    var requestParams = '?rapidViewId={rapidView}'.replace('{rapidView}', urlParams.get('rapidView'));
    var requestUrl    = CONFIG.JIRA_URL + CONFIG.ENDPOINT.ISSUES + requestParams;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", requestUrl, false);
    
    xhr.onload = function() {

      try {

        var response = JSON.parse(xhr.responseText);
        var issues   = response.issuesData.issues;

        chrome.storage.local.set({'issues': issues});

      } catch(e) {
        chrome.storage.local.set({'issues': []});
        console.log(e);
      }
      
    }

    xhr.send();

};

var executeCallback = function(response) {

  // OPEN PRINT PAGE
  chrome.tabs.create({url: chrome.extension.getURL('print/print.html')});

};

chrome.tabs.executeScript({
    code: '(' + executeDetails + ')(' + JSON.stringify(executeParams) + ');'
}, executeCallback);
