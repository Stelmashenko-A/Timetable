function GrsuLoader(params) {
    this.groupSchedule = "http://api.grsu.by/1.x/app2/getGroupSchedule";//?groupId=945
    this.getDepartments = "http://api.grsu.by/1.x/app2/getDepartments";
    this.getFaculties = "http://api.grsu.by/1.x/app2/getFaculties";
    this.getGroups = "http://api.grsu.by/1.x/app2/getGroups";//?departmentId=2&facultyId=3&course=3    
}

exports.GrsuLoader = GrsuLoader;
