var grsuLoader = require('./GrsuLoader');
var async = require('async');
var GrsuLoader = new grsuLoader.GrsuLoader();

var http = require('http');

function TimetableMiner(params) {
    this.departments = [];
    this.faculties = [];
    this.courses = [];
    this.groups = [];
};

function initUniversitySructure(timetable,callback) {
    async.parallel([
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadDepartments(function (departments) {
                timetable.departments = departments.items;
            callback();});
        }, 1000);
    },
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadFaculties(function (faculties) {
                timetable.faculties = faculties.items;
            callback();});
        }, 1000);
    },
    function (callback) {
        timetable.courses = [1, 2, 3, 4, 5];
        callback();
    }
], function () {
    callback();
});
}
function RequestParams() {
    this.department;
    this.faculty;
    this.course;
};

function getRequestParams(timetable) {
    var paramsArray = [];
    timetable.departments.forEach(function (department, i, departments) {
        timetable.faculties.forEach(function (faculty, j, faculties) {
            timetable.courses.forEach(function (course, k, courses) {
                var params = new RequestParams();
                params.department = department;
                params.faculty = faculty;
                params.course = course;
                paramsArray.push(params);
            });
        });
    });
    return paramsArray;
}

function initGroups(timetable,callback) {
    var requestParamsArray = getRequestParams(timetable);
    timetable.groups = [];
    async.each(requestParamsArray, function (requestParams, callback) {
        GrsuLoader.loadGroups(requestParams.department.id, requestParams.faculty.id, requestParams.course, function (groups) {
                    groups.items.forEach(function (group, k, groups){
                        group.department = requestParams.department;
                        group.faculty = requestParams.faculty;
                        group.course = requestParams.course;
                    });
                    timetable.groups = timetable.groups.concat(groups.items);                   
                    callback();
                });
    }, callback);
}

TimetableMiner.prototype.loadAllTimetable = function (callback) {
    async.waterfall([
    function (callback) {
        initUniversitySructure(TimetableMiner, callback);
    },
    function (callback) {
        initGroups(TimetableMiner, callback);
    }
], function (params) {
    console.log(TimetableMiner.groups);
    callback();
});
};

exports.TimetableMiner = TimetableMiner;
