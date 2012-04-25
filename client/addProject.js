Template.addProjectLink.events = {
    'click #addProjectSubmit': function(e) {
//        Project.insert();
        console.log('hey');
    },

    'click .expand': function(e) {
        e.preventDefault();
        $('.expandable').toggle();
    }
};
