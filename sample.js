var jscr = require('./index');
var util = require('util');

jscr('./src').then(function(data){

  console.log(JSON.stringify(data.report, null, 6));

}).caught(console.log);