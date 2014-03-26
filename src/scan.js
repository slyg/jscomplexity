    
var walk = require('walk'),
    Promise = require('bluebird');

var Reporter = require('./lib/Reporter');

/**
 * builds a complexity report of .js files 
 * found in a file tree from a given path
 *
 *   returns a Promise
 *   rejects promise if any runtime error occurs
 */

function scan(path, skippedDirectories, isVerbose){

  var resolver = Promise.defer(),
      walker = walk.walk(path || './'),
      reporter = new Reporter(skippedDirectories ? skippedDirectories : [], isVerbose);

  walker
    .on("file", reporter.populate)
    .on("error", function(){ resolver.reject('runtime error'); })
    .on("end",   function(){ resolver.resolve( reporter.getResults() ); })
  ;

  return resolver.promise;

}

module.exports = scan;
