var express = require('express'),
    app = express.createServer();

// globals
Db = mongoose.connect('mongodb://localhost/goally');
mongoose = require('mongoose');
Resource = require('express-resource');

app.get('/', function(req, res){
     res.send('Hello World');
});

// console logger
app.use(express.logger());

// define top level Express resources
app.resource('project', require('./project/project.js'));

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
