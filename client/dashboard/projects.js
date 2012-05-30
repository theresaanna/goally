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

Template.projects.addMilestoneForm = function() {
    // adds related project for input element data attribute
    return Project.find();
}

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


