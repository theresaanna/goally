var ProjectSchema = new db.Schema({
    name:   String,
    owner:  String,
    milestones: [{type: db.Schema.ObjectId, ref: 'Milestone'}],
    status: String,
    created: {type: Date, default: Date.now()}
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports.new = function(req, res) {
    var inst = new Project();
    inst.name = 'thing';
    inst.save(function(error) {
        if (error) {
            console.log(error);
        }
    });
    res.send(inst);
}

module.exports.show = function(req, res) {
    var pid = req.params.project;
    Project.find({_id: pid}, function(err, docs) {
        res.send(docs);
    });
}

module.exports.index = function(req, res) {
    Project.find({name: 'thing'}, function(err, docs) {
        res.send(docs + 'hiiii');
    });
}
