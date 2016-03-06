var express = require('express');
var grsuLoader = require('./GrsuLoader');

var router = express.Router();
var GrsuLoader = new grsuLoader.GrsuLoader();

router.get('/getFaculties', function (req, res) {
    GrsuLoader.LoadFaculties(function (params) {
        res.json(JSON.parse(params));
    });
});

router.get('/getDepartments', function (req, res) {
  GrsuLoader.LoadDepartments(function (params) {
        res.json(JSON.parse(params));
    });
});

router.get('/getGroupSchedule', function (req, res) {
    GrsuLoader.LoadGroupSchedule(req.query.groupId, function (params) {
        res.json(JSON.parse(params));
    });
});

router.get('/getGroups', function (req, res) {
    GrsuLoader.LoadGroups(req.query.departmentId, req.query.facultyId, req.query.course, function (params) {
        res.json(JSON.parse(params));
    });
});

module.exports = router;
