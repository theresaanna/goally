var TaskSchema = new db.Schema({
    name: String,
    notes: String,
    status: String,
    created: {type: Date, default: Date.now()}
});

Task = mongoose.model('Task', TaskSchema);
