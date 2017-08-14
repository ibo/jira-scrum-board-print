var executeParams  = {};

var executeDetails = function(params) {

    var sourceCode   = document.body;
    var issues       = document.querySelectorAll("#ghx-pool .ghx-swimlane");
    var localStorage = {};

    var getClassName = function(title) {

      var className = '';

      var keywords = [
        { name:"[Development]", class:"development" },
        { name:"[Test]", class:"test" },
        { name:"[Review]", class:"review" }
      ];

      for( var index in keywords ) {

          var keyword = keywords[index];

          if ( title.split(keyword.name).length > 1 ) {

            className = keyword.class;
            break;

          }

      }

      return className;

    };

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
        className: "pbi",
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

        var title = subTask.querySelector(".ghx-summary").innerText;
        var className = getClassName(title);

        var subTaskData = {
          key: subTask.getAttribute("data-issue-key"),
          time: subTaskTime,
          title: title,
          className: className
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
