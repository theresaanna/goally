var express = require('express'),
    app = express.createServer();
mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/goally'),
Resource = require('express-resource');

app.get('/', function(req, res){
     res.render('projectIndex.jade');
});

// console logger
app.use(express.logger());
app.use(express.errorHandler({
    showStack: true,
    dumpExceptions: true
}));

// include top level controllers
app.resource('tasks', require('./task/task'));
app.resource('milestones', require('./milestone/milestone'));
app.resource('projects', require('./project/project'));

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
