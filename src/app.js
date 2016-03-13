var express = require('express');
var router = require('./router');
var mongoose = require('mongoose');
// var tt = require('./timetable_miner');
// var TimetableMiner = new tt.TimetableMiner();
// TimetableMiner.loadAllTimetable(); 

var router = express.Router();

var app = express();
app.use('/', router);

app.listen(8888); 

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('rtyguhi');
});
