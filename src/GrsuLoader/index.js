var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
function GrsuLoader(params) {
    this.host = 'api.grsu.by';
    this.groupSchedule = '/1.x/app1/getGroupSchedule';// ?groupId=945
    this.getDepartments = '/1.x/app1/getDepartments';
    this.getFaculties = '/1.x/app1/getFaculties';
    this.getGroups = '/1.x/app1/getGroups';// ?departmentId=2&facultyId=3&course=3
    //http://api.grsu.by/1.x/app1/getGroupSchedule?groupId=945&dateStart=24.03.2016&dateEnd=24.04.2016
};
GrsuLoader.prototype.Load = function (path, callback) {
    var body = [];
    var req = http.get({
        hostname: this.host,
        path: path,
        agent: false
    }, (res) => {
        res.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            try{
                var obj = JSON.parse(Buffer.concat(body).toString());
                callback(null, obj); // body.toString() -> unexpected comma
            }catch (err) {
                callback(err, null);
            }
        }
            );
    });
    req.on('error', (e) => {
        callback(e, null);
    });
};
GrsuLoader.prototype.loadGroupschedule = function (group, callback) {
    var path = this.groupSchedule + '?groupId=' + group;
    this.Load(path, callback);
};

GrsuLoader.prototype.loadDepartments = function (callback) {
    var path = this.getDepartments;
    this.Load(path, callback);
};

GrsuLoader.prototype.loadFaculties = function (callback) {
    var path = this.getFaculties;
    this.Load(path, callback);
};

GrsuLoader.prototype.loadGroups = function (departmentId, facultyId, course, callback) {
    var path = this.getGroups + '?departmentId=' + departmentId + '&facultyId=' + facultyId + '&course=' + course;
    this.Load(path, callback);
};

exports.GrsuLoader = GrsuLoader;
