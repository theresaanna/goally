Template.tasks = function() {
    return Task.find();
}

Template.addTaskNotesForm = function() {
    return Task.find();
}

Template.tasks.events = {
    'click .addTaskNotesLink': function(event) {
        event.preventDefault();
        var context = $(event.target).next('.addTaskNotesForm');
        context.toggle();
        // initialize wysihtml5
        console.log(context.children().length);
        context.find('#addTaskNotes').wysihtml5();
    },

    'click .removeTask': function(event) {
        event.preventDefault();
        var taskName = $(event.target).prev().html();   
        Task.remove({name: taskName});
   },
    
    // replicated in each of the main three data types
    // so not DRY, but I can't find a better way where the collection type is still in context
    'click .statusListItem': function(event) {
        var newStatus = this.name;
            taskName = $(event.target).attr('data-parent-name');
        Task.update({name: taskName}, {$set: {status: newStatus}});
        $(event.target).parent('expandable').toggle(); 
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


