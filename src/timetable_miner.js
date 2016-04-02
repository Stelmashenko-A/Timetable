var grsuLoader = require('./GrsuLoader');
var async = require('async');
var GrsuLoader = new grsuLoader.GrsuLoader();
var GrsuSrtucture = require ('./grsu-srtucture').GrsuSrtucture;
var http = require('http');

function TimetableMiner(params) {
};

function initUniversitySructure(grsuSrtucture,callback) {
    async.parallel([
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadDepartments(function (departments) {
                grsuSrtucture.departments = departments.items;
            callback();});
        }, 1000);
    },
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadFaculties(function (faculties) {
                grsuSrtucture.faculties = faculties.items;
            callback();});
        }, 1000);
    },
    function (callback) {
        grsuSrtucture.courses = [1, 2, 3, 4, 5];
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

function getRequestParams(grsuSrtucture) {
    var paramsArray = [];
    grsuSrtucture.departments.forEach(function (department, i, departments) {
        grsuSrtucture.faculties.forEach(function (faculty, j, faculties) {
            grsuSrtucture.courses.forEach(function (course, k, courses) {
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

function initGroups(grsuSrtucture,callback) {
    var requestParamsArray = getRequestParams(grsuSrtucture);
    grsuSrtucture.groups = [];
    async.each(requestParamsArray, function (requestParams, callback) {
        GrsuLoader.loadGroups(requestParams.department.id,
         requestParams.faculty.id, requestParams.course, function (groups) {
                    groups.items.forEach(function (group, k, groups) {
                        group.department = requestParams.department;
                        group.faculty = requestParams.faculty;
                        group.course = requestParams.course;
                    });
                    grsuSrtucture.groups = grsuSrtucture.groups.concat(groups.items);
                    callback();
                });
    }, callback);
}

TimetableMiner.prototype.loadAllTimetable = function (callback) {
    var grsuSrtucture = new GrsuSrtucture();
    async.waterfall([
    function (callback) {
        initUniversitySructure(grsuSrtucture, callback);
    },
    function (callback) {
        initGroups(grsuSrtucture, callback);
    }
], function (params) {
    console.log(grsuSrtucture.groups);
    callback();
});
};

exports.TimetableMiner = TimetableMiner;
