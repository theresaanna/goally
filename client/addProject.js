Template.addProject.events = {
    'click #addProjectSubmit': function(e) {
        e.preventDefault();
        var projName = document.getElementById('newProjectName').value;
        Project.insert({ name: projName });
    }
};

Template.addProjectLink.events = {
    'click .expand': function(e) {
        e.preventDefault();
        $('.expandable').toggle();
    }
};
