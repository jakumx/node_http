var assert = require('assert');
var httpRequest  = require('../httpRequest');

describe('http request', function () {

	this.timeout(4000);

	it('should return a response', function (done) {
		httpRequest(function (err, response) {
			if (err) done(err);
			else done();
		});
	});


});
