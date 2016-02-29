var http = require("http");


function start(route, handle) {
	function onRequest(req, res) {
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		route(handle, req, res);
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start;