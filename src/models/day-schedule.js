var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var DayScheduleSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    saved: {
        type: Date,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    lessons: {
        type: [],
        required: true,
    }
});
DayScheduleSchema.statics.buildDayScheduleSchema = function (group, daySchedule) {
    var Model = mongoose.model('DayScheduleSchema', DayScheduleSchema);
    var dayScheduleSchema = new Model();
    dayScheduleSchema.date = daySchedule.date;
    dayScheduleSchema.lessons = daySchedule.lessons;
    dayScheduleSchema.saved = Date.now();
    dayScheduleSchema.group = group;
    return dayScheduleSchema;
};

exports.DayScheduleSchema = mongoose.model('DayScheduleSchema', DayScheduleSchema);
