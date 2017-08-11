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
        title: item.querySelector(".ghx-heading .ghx-summary").innerText,
        subTasks: {}
      };

      // IssueSubTasks
      for ( j = 0; j < issueSubTasks.length; j++ ) {

        var subTask = issueSubTasks[j];

        var subTaskData = {
          key: subTask.getAttribute("data-issue-key"),
          time: subTask.querySelector(".ghx-end span").innerText,
          title: subTask.querySelector(".ghx-issue-content .ghx-issue-fields .ghx-summary .ghx-inner").innerText,
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

	console.log('response:');
  console.log(response);

  // HIDE PRELOADER

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
