var jscr = require('./index');
var util = require('util');

jscr('./src').then(function(report){

  console.log(JSON.stringify(report.data, null, 6));

}).caught(console.log);