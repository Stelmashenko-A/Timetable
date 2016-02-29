var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/getFaculties"] = requestHandlers.loadFaculties;
handle["/departments"] = requestHandlers.loadDepartments;
handle["/getGroupSchedule"] = requestHandlers.loadGroupSchedule;
handle["/getGroups"] = requestHandlers.loadGroups;

server.start(router.route, handle);