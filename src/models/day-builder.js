var Day = require('./day-schedule').Day;
//statics methods
//index
function buildDay(group, day) {
    var storedDay = new Day();
    storedDay.date = day.date;
    storedDay.lessons = Array.from(day.lessons);
    storedDay.saved = Date.now();
    storedDay.group = group;
    return storedDay;
}

exports.buildDay = buildDay;
