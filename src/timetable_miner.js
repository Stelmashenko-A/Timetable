var grsuLoader = require('./GrsuLoader');
var async = require('async');
var GrsuLoader = new grsuLoader.GrsuLoader();

var http = require('http');

function TimetableMiner(params) {
    this.departments = [];
    this.faculties = [];
    this.courses = [];
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

function initGroups(timetable,callback) {
    timetable.departments.forEach(function (department) {
        timetable.faculties.forEach(function (faculty) {
            timetable.courses.forEach(function (course) {
                GrsuLoader.loadGroups(department.id, faculty.id, course, function (groups) {
                    console.log(groups.items);
                });
            });
        });
    });
    // callback call early
    // not forget to fix
    callback();
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
    callback();
});
};

exports.TimetableMiner = TimetableMiner;
