Project = new Meteor.Collection('projects');

if (Meteor.is_client) {
  Template.projects.project = function () {
    return Project.find();
  };

  Template.projects.milestones = function() {
    return Project.find('milestones');
  };

  Template.projects.milestones.tasks = function() {
    return Project.find('milestone.tasks');
  };

  Template.projects.events = {
    'click .edit' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Project.insert({projectName: 'Build Goalie', milestones: [{milestone: 'Install Meteor', status: 'done'}, {milestone: 'Write CRUD functionality', status: 'active'}]});
//Project.remove({projectName: "thing"});
//Project.insert({projectName: "Do laundry", status: "in progress", milestones: [ {milestone: 'get laundry together', tasks: ['find laundry', 'get laundry card', 'get detergent']}, {milestone: 'fold laundry'}]});
