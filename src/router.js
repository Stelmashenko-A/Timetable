var url = require("url");

function route(handle, req, res) {
    var urlParsed = url.parse(req.url, true);
    if (typeof handle[urlParsed.pathname] === 'function') {
        handle[urlParsed.pathname](req, res);
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
}

exports.route = route;