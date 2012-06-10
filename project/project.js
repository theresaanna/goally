var ProjectSchema = new Db.Schema({
    name:   String
});

Project = mongoose.model('Project', ProjectSchema);

var project = new Project();
project.name = "mongoosey";

project.save(function(error) {
    if (error) {
        console.log(error);
    }
});

Project.find({}, function(err, docs) { 
    for (i in docs) {
        console.log(docs[i].name);
    }
});
