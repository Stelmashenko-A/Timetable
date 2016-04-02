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

module.exports = getRequestParams;
