var http = require('http');
var exec = require('exec');

module.exports = function () {

    http.createServer(function(request, response) {

        if (request.method === 'GET' && request.url === '/exec') {

            funExec('pwd && ls', function (err, out, code) {

                response.statusCode = 200;
                response.write(err || out, 'utf8');
                response.end();

            });

        } else {

            response.statusCode = 404;
            response.end();

        }

    }).listen(8080);
    
}




var funExec = function (command, callback) {

    exec(command, function (err, out, code) {

        callback(err, out, code);

    });

}