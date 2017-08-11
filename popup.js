var executeParams  = {};

var executeDetails = function(params) {

    var sourceCode   = document.body;
    var issues       = document.querySelectorAll("#ghx-pool .ghx-swimlane");
    var localStorage = {};

    if ( issues.length < 1 ) {

      return { success: false };

    }

    for ( i = 0; i < issues.length; i++ ) {

      // GetDomIssue
      var item = issues[i];

      // GetIssueSubTasks
      var issueSubTasks = item.querySelectorAll(".ghx-issue-subtask");

      // Storage Data
      var data = {
        key: item.querySelector(".ghx-swimlane-header").getAttribute("data-issue-key"),
        title: item.querySelector(".ghx-summary").innerText,
        subTasks: {}
      };

      // IssueSubTasks
      for ( j = 0; j < issueSubTasks.length; j++ ) {

        var subTask = issueSubTasks[j];

        var subTaskTimeDom = subTask.querySelector(".ghx-end span");

        if ( subTaskTimeDom == undefined ) {
          var subTaskTime = '';
        } else {
          var subTaskTime = subTaskTimeDom.innerText;
        }

        var subTaskData = {
          key: subTask.getAttribute("data-issue-key"),
          time: subTaskTime,
          title: subTask.querySelector(".ghx-summary").innerText
        };

        data.subTasks[subTaskData.key] = subTaskData;

      }

      // Save Object
      localStorage[data.key] = data;

    };

    chrome.storage.local.set({'issues': localStorage}, function() {

        // console.log('Save!');

    });

    chrome.storage.local.get('issues', function(data) {

        // console.log(data);

    });

    return { success: true };

};

var executeCallback = function(response) {

  // OPEN PRINT PAGE
  if ( response[0].success === true ) {
    chrome.tabs.create({url: chrome.extension.getURL('print/print.html')});
  } else {
    window.close();
  }

};

chrome.tabs.executeScript({
    code: '(' + executeDetails + ')(' + JSON.stringify(executeParams) + ');'
}, executeCallback);
