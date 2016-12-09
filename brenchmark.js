var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var httpRequest = require('./httpRequest');

// add tests
suite.add('http request', function() {
  httpRequest(function(err, done) {
  	console.log(err, done);
  });
})
.add('abdc', function () {
	console.log('.');
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  this.forEach(function (a) {
  	console.log('----------');
  	console.log(a.times);
  });
})
// run async
.run({ 'async': true });