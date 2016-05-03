var grsuLoader = require('./GrsuLoader');
var async = require('async');
var GrsuLoader = new grsuLoader.GrsuLoader();
var GrsuSrtucture = require ('./grsu-srtucture').GrsuSrtucture;
var http = require('http');
var getRequestParams = require('./lib/request-params');
var count = 0;
function TimetableMiner(params) {
};

function initUniversitySructure(grsuSrtucture,callback) {
    async.parallel([
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadDepartments(function (err, departments) {
                grsuSrtucture.departments = departments.items;
            callback();});
        }, 1000);
    },
    function (callback) {
        setTimeout(function () {
            GrsuLoader.loadFaculties(function (err, faculties) {
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

function initGroups(grsuSrtucture,callback) {
    var requestParamsArray = getRequestParams(grsuSrtucture);
    grsuSrtucture.groups = [];
    var loadGroups = function (requestParams, callback) {
        GrsuLoader.loadGroups(requestParams.department.id,
         requestParams.faculty.id, requestParams.course, function (err, groups) {             
             var map = function (group, k, groups) {
                        group.department = requestParams.department;
                        group.faculty = requestParams.faculty;
                        group.course = requestParams.course;
                    };
             groups.items.forEach(map);
             grsuSrtucture.groups = grsuSrtucture.groups.concat(groups.items);
             callback();
         });
    };
    async.each(requestParamsArray, loadGroups, callback);
}

TimetableMiner.prototype.loadGrsuStructure = function (callback) {
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
    callback(grsuSrtucture);
});
};

TimetableMiner.prototype.loadSchedule = function (groups, callback) {
    var start = count * 100;
    console.log(start);
    count++;
    if (count > groups.length / 100){
        count = 0;
    }
    var end = start + 100;
    if (groups.length < end){
        end = groups.length;
    }
    var groupsForProcessing = groups.slice(start, end - 1);
    var scheduleArray = [];
    var j = 0;
    var loadGroupschedule = function (group, callback1) {
        var prepareLoadedData = function (err, loadedScheduleArray) {
            if (err != null){
                console.log(err);
                callback1(err);
            }else {
                j++;
                console.log(j);
                var saveWithId = function (day, i, days) {
                    day.groupId = group.id;
                    scheduleArray.push(day);
                    callback1;
                };
                loadedScheduleArray.days.forEach(saveWithId);
                callback(null, loadedScheduleArray, group.id);
            }
        };
        GrsuLoader.loadGroupschedule(group.id, prepareLoadedData);
    };
    console.log(groups.length);
    async.each(groupsForProcessing, loadGroupschedule, function (err, response) {
        callback(err, scheduleArray, -1);
    });
};

exports.TimetableMiner = TimetableMiner;
