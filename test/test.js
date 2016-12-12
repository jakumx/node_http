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
		var arryTimes = [];

		async.during(
		    function (callback) {
		    	return callback(null, moment() <= after);
		    },
		    function (callback) {

		    	var startDate = moment();

		    	httpRequest(function (err, response) {
			        count++;
			        var endDate = moment();
			        arryTimes.push(endDate.diff(startDate, 'milliseconds'));
			        setTimeout(callback, 0);
				});

		    },
		    function (err) {
		    	console.log('during count: ' + count);
		    	console.log('prom: ' + prom(arryTimes) + 'ms');
		        done();
		    }
		);

	});

	it('how many counts in one second with "whilst"', function (done) {

		var now = moment();
		var after = moment(now).add(1, 's');
		var count = 0;
		var arryTimes = [];

		async.whilst(
			function () {
				return moment() <= after;
			}, function (callback) {
				setTimeout(function() {
					var startDate = moment();
					httpRequest(function (err, response) {
			        	count++;
			        	var endDate = moment();
			        	arryTimes.push(endDate.diff(startDate, 'milliseconds'));
			        	callback(null, count);
					});
				},0);
			}, function (err, n) {
				console.log('\nwhilst count: ' +  count);
		    	console.log('prom: ' + prom(arryTimes) + 'ms');
				done();
			}
		);

	});


});

function prom(arry) {

	var count = 0;

	arry.forEach(function (a) {
		count += a;
	});

	return count/arry.length;

}
