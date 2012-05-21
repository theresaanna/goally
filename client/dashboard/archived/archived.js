  Template.archivedProjects.archivedProject = function() {
    return ProjectArchive.find();
  };

Template.archivedProject.milestones = function() {
    var milestones = this.milestones;
    if (typeof milestones !== 'undefined') {
        return Milestone.find({_id: {$in: milestones}}); 
    }
    else {
        return null;
    }
 };

  Template.archivedMilestones.tasks = function() {
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

  Template.archivedTasks = function() {
    return Task.find();
  }
