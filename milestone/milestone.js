var MilestoneSchema = new db.Schema({
    name: String,
    tasks: [{type: db.Schema.ObjectId, ref: 'Task'}],
    status: String,
    created: {type: Date, default: Date.now()}
});

Milestone = mongoose.model('Milestone', MilestoneSchema);
