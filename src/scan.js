var walk = require('walk'),
    Promise = require('bluebird'),
    path = require('path');

var Reporter = require('./lib/Reporter');

/**
 * Scan a file tree seeking for js files and generates a complexity report 
 *
 * @public
 * @param {String}  'path'                The filetree root directory
 * @param {Array}   'skippedDirectories'  The paths patterns to be skipped during walk
 * @param {Boolean} 'isVerbose'           The log stdout option
 * @returns {Promise}                     The fulfilled promise returns the final report
 */

module.exports = function (rootPath, skippedDirectories, isVerbose){

  var resolver = Promise.defer(),
      walker = walk.walk(rootPath || './'),
      reporter = new Reporter(skippedDirectories ? skippedDirectories : [], isVerbose ? isVerbose : false);

  walker
    .on("file",  function(root, fileStats, next){

      var fileRef = path.normalize(root + '/' + fileStats.name);
      return reporter.populate(fileRef, next);

    })
    .on("error", function(){ return resolver.reject('runtime error'); })
    .on("end",   function(){ return resolver.resolve( reporter.getResults() ); })
  ;

  return resolver.promise;

};
