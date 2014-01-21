var jscr = require('./index');
var util = require('util');

jscr('./utils').then(function(report){

  console.log(JSON.stringify(report, null, 6));

}).caught(console.log);