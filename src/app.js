var express = require('express');
var router = require('./router');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var tt = require('./timetable_miner');
var TimetableMiner = new tt.TimetableMiner();

var j = schedule.scheduleJob('0 0 20 2,8 *', function () {
    TimetableMiner.loadAllTimetable(function () {
      console.log('qwerty');
  });
});
TimetableMiner.loadAllTimetable(function () {
      console.log('qwerty');
  });
var config = require('../config');
var app = express();
app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(config.get('port'));

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('rtyguhi');
});
