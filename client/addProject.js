Template.addProjectLink.events = {
    'click #addProjectSubmit': function(e) {
        e.preventDefault();
        
        var name = $('[name="projectName"]').attr('value'),
            formMilestones = $('[name="milestone"]').attr('value'),
            formTasks = $('[name="task"]').attr('value');    
        
        $(formTasks).each(function() {
            console.log(this);
        });

    },

    'click .expand': function(e) {
        e.preventDefault();
        $('.expandable').toggle();
    }
};
