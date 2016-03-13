var grsuLoader = require('./GrsuLoader');

var GrsuLoader = new grsuLoader.GrsuLoader();

var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
function TimetableMiner(params) {
    this.departments = [];
    this.faculties = [];
};

TimetableMiner.prototype.loadAllTimetable = function () {
    GrsuLoader.loadDepartments(function (departments) {
        this.departments = JSON.parse(departments).items;
        GrsuLoader.loadFaculties(function (faculties) {
            this.faculties = JSON.parse(faculties).items;
            console.log(this.faculties);
            this.departments.forEach(function (department) {
                this.faculties.forEach(function (faculty) {
                    GrsuLoader.loadGroups(department.id, faculty.id, 1, function (groups) {
                        console.log(groups);
                    });
                });
            });
        });
    });
};

exports.TimetableMiner = TimetableMiner;
