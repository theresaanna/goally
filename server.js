var express = require('express'),
    app = express.createServer();
mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/goally'),
Resource = require('express-resource');

app.get('/', function(req, res){
     res.send('Hello World');
});

// console logger
app.use(express.logger());

// include top level controllers
app.resource('tasks', require('./task/task'));
app.resource('milestones', require('./milestone/milestone'));
app.resource('projects', require('./project/project'));

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
