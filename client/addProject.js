Template.addProjectLink.events = {
    'click #addProjectSubmit': function(e) {
//        Project.insert();
        console.log('hey');
    },

    'click #addProjectForm': function(e) {
        e.preventDefault();
     
        var container = document.getElementsByName('addProjectFormContainer')[0].id = "open";
    }
};
