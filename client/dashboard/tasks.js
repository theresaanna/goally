Template.tasks = function() {
    return Task.find();
}

Template.addTaskNotesForm = function() {
    return Task.find();
}

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


