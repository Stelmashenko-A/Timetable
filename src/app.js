var express = require('express');
var router = require('./router');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var tt = require('./timetable_miner');
var TimetableMiner = new tt.TimetableMiner();
var Day = require('./models/day-schedule').DayScheduleSchema;
var Group = require('./models/group').Group;

var job = schedule.scheduleJob('0 0 20 2,8 *', function () {
    var buildGroups = function (group, i, groups) {
        var gr = Group.buildGroup(group);
        gr.save(function (err, gr, affected) {
            if (err) {
                console.log(gr);
                throw err;
            }
        });
    };
    TimetableMiner.loadGrsuStructure(function (structure) {
    structure.groups.forEach(buildGroups);

});
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
GrsuLoader.loadGroupschedule(945, function (err, timetable) {
    var d = Day.buildDayScheduleSchema(940, timetable.days[0]);
    /*Day.findOne({group: '940'}, function (err, day) {
        console.log(day);
    });
    d.save(function (err, user, affected) {
        if (err) {
            throw err;
        }
    });*/
});
/*Group.find({}, function (err, groups) {
    TimetableMiner.loadSchedule(groups, function (params) {
        console.log('qwertyuihgfdf');
    });
});*/
function compareGroups(group1, group2) {
    return group1.id - group2.id;
}

var job = schedule.scheduleJob('*/1 * * * *', function () {
    Group.find({}, function (err, groups) {
        groups.sort(compareGroups);
        TimetableMiner.loadSchedule(groups, function (err, day, group) {

            if (err == null){
                for (var i = 0; i < day.count; i++){
                    var d = Day.buildDayScheduleSchema(group, day.days[i]);
                    d.save(function (err, day, affected) {
                    if (err) {
                        throw err;
                    }
                });
                }
            }
        });
    });

});
