var assert = require('assert');
	server = require('../server.js'),
	moment = require('moment'),
	async = require('async');
var httpRequest  = require('../httpRequest');

server();

describe('http request', function () {

	this.timeout(8000);

	it('how many counts in one second with "during"', function (done) {

		var now = moment();
		var after = moment(now).add(1, 's');
		var count = 0;

		async.during(
		    function (callback) {
		    	return callback(null, moment() <= after);
		    },
		    function (callback) {

	    	httpRequest(function (err, response) {
		        count++;
		        setTimeout(callback, 0);
			});

		    },
		    function (err) {
		    	console.log('during count: ' + count);
		        done();
		    }
		);

	});

	it('how many counts in one second with "whilst"', function (done) {
		
		var now = moment();
		var after = moment(now).add(1, 's');
		var count = 0;

		async.whilst(
			function () {
				return moment() <= after;
			}, function (callback) {
				setTimeout(function() {
					httpRequest(function (err, response) {
			        	count++;
			        	callback(null, count);
					});
				},0);
			}, function (err, n) {
				console.log('whilst count: ' +  count);
				done();
			}
		);

	});


});
