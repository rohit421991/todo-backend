var http = require('http');
var app = require('./app');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World!");

// });

var port = process.env.PORT || 1337;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

console.log("Server running at http://localhost:%d", port);
