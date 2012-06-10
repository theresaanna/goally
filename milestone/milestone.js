var MilestoneSchema = new Db.Schema({
    name: String,
    tasks: [{type: Db.Schema.ObjectId, ref: 'Task'}],
    status: String,
    created: {type: Date, default: Date.now()}
});

Milestone = mongoose.model('Milestone', MilestoneSchema);
