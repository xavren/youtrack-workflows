var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Copy all not resolved subtasks to sprint'),
  guard: function(ctx) {
     return ctx.issue.fields.isChanged('Sprints') && ctx.issue.links["parent for"].isNotEmpty();
  },
  action: function(ctx) {
    var issue = ctx.issue;
    var children = issue.links["parent for"];
    
    children.forEach(function(child) {
      	if(!child.isResolved) {
        	child.fields['Sprints'] = issue.fields['Sprints'];
        }
    });
  },
  requirements: {}
});
