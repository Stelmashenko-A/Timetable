var http = require("http");
var StringDecoder = require('string_decoder').StringDecoder;
function GrsuLoader(params) {
    this.host = "api.grsu.by"
    this.groupSchedule = "/1.x/app2/getGroupSchedule";//?groupId=945
    this.getDepartments = "/1.x/app2/getDepartments";
    this.getFaculties = "/1.x/app2/getFaculties";
    this.getGroups = "/1.x/app2/getGroups";//?departmentId=2&facultyId=3&course=3    
};

GrsuLoader.prototype.LoadGroupSchedule = function (group, callback) {
    http.get({
        hostname: this.host,
        path: this.groupSchedule + '?groupId=' + group,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            var decoder = new StringDecoder('utf8');
            callback(decoder.write(chunk));
        });
    });
};

GrsuLoader.prototype.LoadDepartments = function (callback) {
    http.get({
        hostname: this.host,
        path: this.getDepartments,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            var decoder = new StringDecoder('utf8');
            callback(decoder.write(chunk));
        });
    });
};

GrsuLoader.prototype.LoadFaculties = function (callback) {
    http.get({
        hostname: this.host,
        path: this.getFaculties,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            var decoder = new StringDecoder('utf8');
            callback(decoder.write(chunk));
        });
    });
};

GrsuLoader.prototype.LoadGroups = function (departmentId, facultyId, course, callback) {
    http.get({
        hostname: this.host,
        path: this.getGroups + "?departmentId=" + departmentId + "&facultyId=" + facultyId + "&course=" + course,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            var decoder = new StringDecoder('utf8');
            callback(decoder.write(chunk));
        });
    });
}

exports.GrsuLoader = GrsuLoader;
