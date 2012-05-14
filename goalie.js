Project = new Meteor.Collection('projects');
Milestone = new Meteor.Collection('milestones');
Task = new Meteor.Collection('tasks');
ProjectArchive = new Meteor.Collection('projectArchive');

if (Meteor.is_client) {

}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Milestone.update({_id: "1fb92586-7fb2-4a19-8ca9-ed145e74070d"}, {name: "get laundry together", tasks: ["d72d2bc4-b717-4111-bc4f-ef72eaa49e10", "4686be94-0e54-4a43-bba8-1463f49eae80", "56c74fa2-274d-406e-813e-9718d64bfab9", "73b32867-3809-47fe-94fe-893de963f076"]});
// Project.insert({name: "Do laundry", milestones: ["1fb92586-7fb2-4a19-8ca9-ed145e74070d", "6143e13d-2e5a-4993-8eae-d50149fba26f"]});
// Milestone.update({name: "fold laundry"}, {$addToSet: {tasks: ["56c74fa2-274d-406e-813e-9718d64bfab9"]}});
// Milestone.insert({name: "fold laundry", tasks: ["56c74fa2-274d-406e-813e-9718d64bfab9"]});
// Project.insert({name: "Do laundry", status: "in progress", milestones: ["1fb92586-7fb2-4a19-8ca9-ed145e74070d", "6143e13d-2e5a-4993-8eae-d50149fba26f"]});
//Project.update({name: "Do laundry"}, {$addToSet: {milestones: "61bb61b9-8af5-42a3-b954-155211bee8b9"}});
