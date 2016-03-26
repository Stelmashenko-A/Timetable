var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
//var lessonSchema = require('./lesson');

var daySchema = new Schema({
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
exports.Day = mongoose.model('Day', daySchema);
