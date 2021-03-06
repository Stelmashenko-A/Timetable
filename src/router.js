var express = require('express');
var grsuLoader = require('./GrsuLoader');

var router = express.Router();
var GrsuLoader = new grsuLoader.GrsuLoader();
var Day = require('./models/day-schedule').DayScheduleSchema;

router.get('/', function (req, res) {
    res.redirect('/index.html');
});

router.get('/faculties', function (req, res) {
    GrsuLoader.loadFaculties(function (err, params) {
        res.json(params);
    });
});

router.get('/departments', function (req, res) {
    GrsuLoader.loadDepartments(function (err, params) {
        res.json(params);
    });
});

router.get('/groupSchedule', function (req, res) {
    Day.find({group: '947'}, function (err, days) {
        res.json(days);}
    );
    /*GrsuLoader.loadGroupschedule(req.query.groupId, function (err, schedule) {
       
    });*/
});

router.get('/groups', function (req, res) {
    GrsuLoader.loadGroups(req.query.departmentId, req.query.facultyId, req.query.course, function (params) {
        res.json(params);
    });
});

module.exports = router;
