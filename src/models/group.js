var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var Group = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    department_id: {
        type: Number,
        required: true
    },
    departmen_title: {
        type: String,
        required: true
    },
    faculty_id: {
        type: Number,
        required: true
    },
    faculty_title: {
        type: String,
        required: true
    },
    course: {
        type: Number,
        required: true
    }
});
Group.statics.buildDayScheduleSchema = function (group, day) {
    var Model = mongoose.model('Group', Group);
    var groupModel = new Model();
    groupModel.id = group.id;
    groupModel.title = group.title;
    groupModel.department_id = group.department.id;
    groupModel.department_title = group.department.title;
    groupModel.faculty_id = group.faculty.id;
    groupModel.faculty_title = group.faculty.title;
    return groupModel;
};

exports.Group = mongoose.model('Group', Group);
