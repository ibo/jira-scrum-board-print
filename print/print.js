
window.onload = function() {

  var appendIssue = function(issue) {

    try {

      var template = document.getElementById("template").innerHTML;
      var issueKey = issue.key ? issue.key : '';
      var summary  = issue.summary ? issue.summary : '';
      var assignee = issue.assignee ? issue.assignee : '';
      var estimate = '';
      
      if (issue.estimateStatistic !== undefined) {
        var estimate = issue.estimateStatistic.statFieldValue.text ? issue.estimateStatistic.statFieldValue.text : '';
      }

      template = template.replace("{{ key }}", issueKey);
      template = template.replace("{{ summary }}", summary);
      template = template.replace("{{ assignee }}", assignee)
      template = template.replace("{{ estimate }}", estimate);

      document.getElementById("data").innerHTML += template;

    } catch(e) {
      console.log(e);
    }

  };

  chrome.storage.local.get('issues', function(data) {

      var issues = data.issues;

      if (issues.length < 1) { 
        alert('PBI BULUNAMADI!\n"Active Sprint" veya "Kanban Board" sayfasındayken eklentiyi çalıştırmanız gerekiyor.'); 
        return false;
      }

      issues.forEach(function(issue) {
        appendIssue(issue);
      });

      window.print();

  });
}
