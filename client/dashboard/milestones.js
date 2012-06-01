// when implementing sort 
// insert an 'order' index in db if a project's milestones or a milestone's tasks have ever been sorted
// sort by 'order' if exists
// activate sort -> fill in 'order' according to natural sort
// 

Template.milestones.tasks = function() {
    // minimongo dot notation doesn't seem to be working on 0.3.5 either
    // I *should* be able to do this.tasks.t_id if I store ids in objects with t_id 
    // as a key. works in the mongo console but not here
    that = this.tasks;
    if (typeof that !== 'undefined') {
        return Task.find({_id: {$in: that}});
    }
    else {
        return null;
    }
};

Template.milestones.addTaskForm = function() {
    // adds related milestone for input element data attribute
    return Milestone.find();
}

Template.milestones.events = {
    'click .addTaskLink': function(event) {
        event.preventDefault();
        $(event.target).next('.addTaskForm').toggle();
        //initialize ckeditor
        $(event.target).next('textarea').ckeditor();
    },
    
    // replicated in each of the main three data types
    // so not DRY, but I can't find a better way where the collection type is still in context
    'click .statusListItem': function(event) {
        var newStatus = this.name;
            milestoneName = $(event.target).attr('data-parent-name');
        Milestone.update({name: milestoneName}, {$set: {status: newStatus}});
        $(event.target).parent('expandable').toggle(); 
    }
};

Template.addTaskForm.events = {
    'click #addTaskSubmit': function(event) {
        event.preventDefault();
        var field = $(event.target).prev('.taskName'),
            fieldVal = $(field).val(),
            milestoneName = $(field).attr('data-milestone-name');
        var taskId = Task.insert({name: fieldVal, 'status': "To Do", created: Date.now()});
        Milestone.update({name: milestoneName}, {$addToSet: {tasks: taskId}});
    }
};
