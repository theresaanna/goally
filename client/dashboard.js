Template.project.events = {
    'click .addMilestoneLink': function(event) {
        event.preventDefault();
        $(event.target).next('.addMilestoneForm').toggle();
    }
};

Template.addMilestoneForm.events = {
    'click #addMilestoneSubmit': function(event) {
        event.preventDefault();
        var field = $(event.target).prev('.milestoneName'),
            fieldValue = $(field).val(),
            projectName = $(field).attr('data-project-name');
        var milestoneId = Milestone.insert({name: fieldValue});
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
        var taskId = Task.insert({name: fieldVal});
        Milestone.update({name: milestoneName}, {$addToSet: {tasks: taskId}});
    }
};
