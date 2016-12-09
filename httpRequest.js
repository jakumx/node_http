var http = require('http');
var moment = require('moment');

var httpRequest = function (callback) {

	var options = {
	  host: '127.0.0.1',
	  port: 8080,
	  path: '/exec'
	};

	var startDate = moment();

	http.get(options, function(res) {
	  	console.log("Got response: " + res.statusCode);

	 	res.on("data", function(chunk) {
	    	console.log("BODY: " + chunk);
	    	var endDate = moment();

	    	var diffDate = endDate.diff(startDate, 'milliseconds')

	    	console.log('ms: ' + diffDate);

	    	callback(null, chunk);
	  	});

	}).on('error', function(e) {
	 	console.log("Got error: " + e.message);
	 	var endDate = moment();
	 	callback(e.message, null);
	});

}

module.exports = httpRequest;