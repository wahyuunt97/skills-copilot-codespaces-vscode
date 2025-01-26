// create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// create a server
http.createServer(function (req, res) {
    // parse the query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    // read the file content
    var data = fs.readFileSync('comments.json');
    var comments = JSON.parse(data);

    // if the request is a POST request
    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var newComment = qs.parse(body);
            comments.push(newComment);

            fs.writeFileSync('comments.json', JSON.stringify(comments));

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Comment added');
        });
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(comments));
    }
}).listen(8080, '127.0.0.1');