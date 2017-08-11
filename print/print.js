
window.onload = function() {

  var appendIssue = function(key, title, time) {

    var template = document.getElementById("template").innerHTML;
    var template = template.replace("{{ key }}", key).replace("{{ title }}", title).replace("{{ time }}", time);

    document.getElementById("data").innerHTML += template;

  };

  chrome.storage.local.get('issues', function(data) {

      var issues   = data.issues;

      console.log(issues);

      for( var index in issues ) {

          var item = issues[index];
          var subTasks = item.subTasks;

          appendIssue( item.key, item.title, "" );

          for( var index in subTasks ) {

            var subTask = subTasks[index];

            appendIssue( item.key + ' / ' + subTask.key, subTask.title, subTask.time );

          }

      }

      // PRINT
      window.print();

  });
}
