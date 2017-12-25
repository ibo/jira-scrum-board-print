
window.onload = function() {

  var appendIssue = function(key, title, time, className) {

    var template = document.getElementById("template").innerHTML;
    var template = template.replace("{{ key }}", key).replace("{{ title }}", title).replace("{{ time }}", time).replace("{{ className }}", className);

    document.getElementById("data").innerHTML += template;

  };

  chrome.storage.local.get('issues', function(data) {

      var issues   = data.issues;

      console.log(issues);

      for( var index in issues ) {

          var item = issues[index];
          var subTasks = item.subTasks;

          appendIssue( item.key, item.title, item.time, item.className );

          for( var index in subTasks ) {

            var subTask = subTasks[index];

            appendIssue( item.key + ' / ' + subTask.key, subTask.title, subTask.time, subTask.className );

          }

      }

      // PRINT
      window.print();

  });
}
