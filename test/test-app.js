var app = require('../src/app');
var request = require('supertest');

request = request('http://localhost:8888');

/*var logError = function (testedRoute, err) {
    if (err != null){
        console.log(testedRoute + ' ' + err);
        return;
    }
    console.log(testedRoute + ' work');
};*/

describe('GET /faculties', function () {
    it('respond with json', function (done) {
        request
        .get('/faculties')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /departments', function () {
    it('respond with json', function (done) {
        request
        .get('/departments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /groupSchedule', function () {
    it('respond with json', function (done) {
        request
        .get('/groupSchedule')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /groups', function () {
    it('respond with json', function (done) {
        request
        .get('/groups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
