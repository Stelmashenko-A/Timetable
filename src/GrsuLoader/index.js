var http = require("http");
var StringDecoder = require('string_decoder').StringDecoder;
function GrsuLoader(params) {
    this.host = "api.grsu.by";
    this.groupSchedule = "/1.x/app2/getGroupSchedule";//?groupId=945
    this.getDepartments = "/1.x/app2/getDepartments";
    this.getFaculties = "/1.x/app2/getFaculties";
    this.getGroups = "/1.x/app2/getGroups";//?departmentId=2&facultyId=3&course=3    
};
GrsuLoader.prototype.Load = function (path, callback) {
    var body = [];
    http.get({
        hostname: this.host,
        path: path,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            callback(body.toString());
        }
            );
    });
};
GrsuLoader.prototype.LoadGroupSchedule = function (group, callback) {
    var path = this.groupSchedule + '?groupId=' + group;
    this.Load(path, callback);
};

GrsuLoader.prototype.LoadDepartments = function (callback) {
    var path = this.getDepartments;
    this.Load(path, callback);
};

GrsuLoader.prototype.LoadFaculties = function (callback) {
    var path = this.getFaculties;
    this.Load(path, callback);
};

GrsuLoader.prototype.LoadGroups = function (departmentId, facultyId, course, callback) {
    var path = this.getGroups + "?departmentId=" + departmentId + "&facultyId=" + facultyId + "&course=" + course;
    this.Load(path, callback);
};

exports.GrsuLoader = GrsuLoader;
