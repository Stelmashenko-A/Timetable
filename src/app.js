var express = require('express');
var router = require('./router');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var tt = require('./timetable_miner');
var TimetableMiner = new tt.TimetableMiner();
var builder = require('./models/day-builder');
var Day = require('./models/day-schedule').DayScheduleSchema;

/*var j = schedule.scheduleJob('0 0 20 2,8 *', function () {
    TimetableMiner.loadAllTimetable(function () {
        console.log('qwerty');
    });
});*/
TimetableMiner.loadAllTimetable(function (timetable) {
    console.log("qwe");
});
var config = require('../config');
var app = express();
app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(config.get('port'));

/*mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('rtyguhi');
});*/
var grsuLoader = require('./GrsuLoader');
var GrsuLoader = new grsuLoader.GrsuLoader();
GrsuLoader.loadGroupschedule(945, function (timetable) {
    var d = Day.buildDayScheduleSchema(949, timetable.days[0]);
    Day.findOne({group: '949'}, function (err, day) {
        console.log(day);
    });
    d.save(function (err, user, affected) {
        if (err) {
            throw err;
        }
    });
});
