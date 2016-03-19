var express = require('express');
var grsuLoader = require('./GrsuLoader');

var router = express.Router();
var GrsuLoader = new grsuLoader.GrsuLoader();

router.get('/faculties', function (req, res) {
    GrsuLoader.loadFaculties(function (params) {
        res.json(params);
    });
});

router.get('/departments', function (req, res) {
    GrsuLoader.loadDepartments(function (params) {
        res.json(params);
    });
});

router.get('/groupSchedule', function (req, res) {
    GrsuLoader.loadGroupschedule(req.query.groupId, function (params) {
        res.json(params);
    });
});

router.get('/groups', function (req, res) {
    GrsuLoader.loadGroups(req.query.departmentId, req.query.facultyId, req.query.course, function (params) {
        res.json(params);
    });
});

module.exports = router;
