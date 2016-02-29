var grsuLoader = require("./GrsuLoader");
var url = require("url");

var GrsuLoader = new grsuLoader.GrsuLoader();

function loadFaculties(req, res) {
  	GrsuLoader.LoadFaculties(function (params) {
        res.end(params);
    });
}

function loadDepartments(req, res) {
  	GrsuLoader.LoadDepartments(function (params) {
        res.end(params);
    });
}

function loadGroupSchedule(req, res) {
	var urlParsed = url.parse(req.url, true);
  	GrsuLoader.LoadGroupSchedule(urlParsed.query.groupId, function (params) {
        res.end(params);
    });
}

function loadGroups(req, res) {
	var urlParsed = url.parse(req.url, true);
  	GrsuLoader.LoadGroups(urlParsed.query.departmentId, urlParsed.query.facultyId, urlParsed.query.course, function (params) {
        res.end(params);
    });
}

exports.loadFaculties = loadFaculties;
exports.loadDepartments = loadDepartments;
exports.loadGroupSchedule = loadGroupSchedule;
exports.loadGroups = loadGroups;