var app = require('../src/app');
var request = require('supertest');

request = request('http://localhost:8888');

var logError = function (testedRoute, err) {
    if (err != null){
        console.log(testedRoute + ' ' + err);
        return;
    }
    console.log(testedRoute + ' work');
};

request.get('/getFaculties').expect(200, function (err) {
  logError('/getFaculties', err);
});

request.get('/getDepartments').expect(200, function (err) {
  logError('/getDepartments', err);
});

request.get('/getGroups?departmentId=2&facultyId=3&course=3').expect(200, function (err) {
  logError('/getGroups?departmentId=2&facultyId=3&course=3', err);
});

request.get('/getGroupSchedule?groupId=945').expect(200, function (err) {
  logError('/getGroupSchedule?groupId=945', err);
});
