var ProjectSchema = new Db.Schema({
    name:   String
});

Project = mongoose.model('Project', ProjectSchema);

var project = {
    create: function(req, res) {
        var inst = new Project();
        inst.name = obj;
        inst.save(function(error) {
            if (error) {
                console.log(error);
            }
        });
    },

    index: function(req, res) {
        var projs;

        Project.find({}, function(err, docs) { 
            for (i in docs) {
                res.send(docs[i].name + ' ');
            }
        });
    }
};

var projectController = app.resource('project', project);


