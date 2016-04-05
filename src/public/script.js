var xhr = new XMLHttpRequest();

xhr.open('GET', 'groupSchedule?groupId=945', true);
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) { return; }
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        function buildHtmlTable(arr) {
            var tbody = document.createElement('tbody');
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].lessons.length; j++) {
                    var tr = document.createElement('tr');
                    var columns = {
                        td_date: arr[i].date,
                        td_time: arr[i].lessons[j].timeStart + " - " + arr[i].lessons[j].timeEnd,
                        td_subgroup: arr[i].lessons[j].subgroup.title,
                        td_lesson: arr[i].lessons[j].type + " " + arr[i].lessons[j].title,
                        td_teacher: arr[i].lessons[j].teacher.post + " " + arr[i].lessons[j].teacher.fullname,
                        td_room: arr[i].lessons[j].room + ", " + arr[i].lessons[j].address
                    };

                    for (var property in columns) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(columns[property]));
                        if (property == "td_date") {
                            td.rowSpan = arr[i].lessons.length;
                            if (j == 0) tr.appendChild(td);
                        }
                        else tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            }
            return tbody;
        }
        document.getElementById('timetable').appendChild(buildHtmlTable(JSON.parse(xhr.response).days));
    }
}
