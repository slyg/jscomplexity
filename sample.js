var jscomplexity = require('./index');
var util = require('util');

// Promise-style

jscomplexity('./src/**').then(function(data){

  console.log(JSON.stringify(data.report, null, 6));

}).caught(console.log);


/**
 * Node-style version :
 *
 * jscomplexity('./src/**', function(err, data){
 *
 * if(err){
 *   return console.log(err);
 * }
 *
 * console.log(JSON.stringify(data.report, null, 6));
 *
 * });
 */