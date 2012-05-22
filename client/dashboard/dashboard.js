Template.projects.project = function () {
    return Project.find({uid: Session.get('user')}, {sort: {created: -1}});
};

Template.project.date = function() {
    return dateFormat(this.created, "mmmm dd 'yy");
};

Template.project.milestones = function() {
    var milestones = this.milestones;
    if (typeof milestones !== 'undefined') {
            return Milestone.find({_id: {$in: milestones}}, {sort: {created: 1}}); 
        }
    else {
        return null;
    }
};

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

Template.tasks = function() {
    return Task.find();
}

Template.addTaskNotesForm = function() {
    return Task.find();
}

Template.projects.addMilestoneForm = function() {
    // adds related project for input element data attribute
    return Project.find();
}

Template.milestones.addTaskForm = function() {
    // adds related milestone for input element data attribute
    return Milestone.find();
}

Template.editStatusForm = function() {
    return Milestone.find();
}

Template.editStatusForm.statuses = ['In Progress', 'Todo', 'Done'];

// event handlers
Template.project.events = {
    'click .addMilestoneLink': function(event) {
        event.preventDefault();
        $(event.target).next('.addMilestoneForm').toggle();
    },

    'click .addToArchiveLink': function(event) {
        event.preventDefault();
        var projectName = $(event.target).attr('data-project-name'),
            project = Project.findOne({name: projectName});
        ProjectArchive.insert({name: project.name, milestones: project.milestones, status: project.status});
        Project.remove({name: projectName});
    }
};

Template.addMilestoneForm.events = {
    'click #addMilestoneSubmit': function(event) {
        event.preventDefault();
        var field = $(event.target).prev('.milestoneName'),
            fieldValue = $(field).val(),
            projectName = $(field).attr('data-project-name');
        var milestoneId = Milestone.insert({name: fieldValue, 'status': "pending", created: Date.now()});
        Project.update({name: projectName}, {$addToSet: {milestones: milestoneId}});
    }
};

Template.milestones.events = {
    'click .addTaskLink': function(event) {
        event.preventDefault();
        $(event.target).next('.addTaskForm').toggle();
    }
};

Template.addTaskForm.events = {
    'click #addTaskSubmit': function(event) {
        event.preventDefault();
        var field = $(event.target).prev('.taskName'),
            fieldVal = $(field).val(),
            milestoneName = $(field).attr('data-milestone-name');
        var taskId = Task.insert({name: fieldVal, 'status': "pending", created: Date.now()});
        Milestone.update({name: milestoneName}, {$addToSet: {tasks: taskId}});
    }
};

Template.tasks.events = {
    'click .addTaskNotesLink': function(event) {
        event.preventDefault();
        $(event.target).next('.addTaskNotesForm').toggle();
    },

    'click .removeTask': function(event) {
        event.preventDefault();
        var taskName = $(event.target).prev().html();   
        Task.remove({name: taskName});
   }
};

Template.addTaskNotesForm.events = {
    'click #addTaskNotesSubmit': function(event) {
        event.preventDefault();
        var field = $(event.target).prev('.addTaskNotes'),
            fieldVal = $(field).val(),
            taskName = $(field).attr('data-task-name');
        Task.update({name: taskName}, {$addToSet: {notes: fieldVal}});
    }
};

Template.itemStatus.events = {
    'click .changeStatus': function(event) {
        event.preventDefault();
        var statusForm = Meteor.ui.chunk(function() {
            return  Template.editStatusForm();
        });
        $(event.target).parent().append(statusForm);
}
};

Template.editStatusForm.events = {
    'select .status': function(event) {
        event.preventDefault();
        return 'hi';
    }
};
