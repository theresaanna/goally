express = require('express'),
app = express.createServer();
mongoose = require('mongoose');
Db = mongoose.connect('mongodb://localhost/goally');
Resource = require('express-resource');

app.get('/', function(req, res){
     res.send('Hello World');
});

// console logger
app.use(express.logger());

// include top level controllers
require('./project/project.js');

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
