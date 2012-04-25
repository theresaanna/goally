Project = new Meteor.Collection('projects');

if (Meteor.is_client) {
  Template.projects.project = function () {
    return Project.find();
  };

  Template.projects.milestones = function() {
    return Project.find('milestones.milestone');
  };

  Template.projects.milestones.tasks = function() {
    return Project.find('milestones.tasks');
  };

  // Template.projects.events = {
    //'click .edit' : function () {
      // template data, if any, is available in 'this'
     // if (typeof console !== 'undefined')
       // console.log("You pressed the button");
   // }
  //};
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Project.insert({projectName: "Do laundry", status: "in progress", milestones: [ {milestone: 'get laundry together', tasks: [ { task: 'find laundry', status: 0}, { task: 'get laundry card', status: 0}, { task: 'get detergent', status: 0} ]}, {milestone: 'fold laundry'}]});
