var Promise = require('bluebird'),
    path = require('path');

var PathFilter = require('./PathFilter'),
    readJSFile = require('./readJSFile'),
    buildFileReport = require('./buildFileReport');

/**
 * Reporter contructor
 * 
 * @public
 * @param {Array} skipPaths     The paths pattern to skip from report
 * @param {Boolean} isVerbose   The verbose mode, ouput info on each added item
 *
 * @returns {Object} returns a Reporter instance
 */

function Reporter(skipPaths, isVerbose){ 

  var 
    reportList = [],
    failsList = [],
    resolver = Promise.defer(),
    isVerbose = isVerbose || false,
    skipPaths = skipPaths || []
  ;

  /**
   * Populates report with informations about one file
   *
   * @param {String} root       The file folder's path
   * @param {Object} fileStats  The informations about current file
   * @param {Function} next     The callback function
   * 
   * @returns {Promise}
   */

  this.populate = function (root, fileStats, next) {

    var fileRef = path.normalize(root + '/' + fileStats.name);
    var pathFilter = new PathFilter(skipPaths);

    return Promise.resolve(fileRef)

      .then(function(fileRef){

        if( pathFilter.isValidFile(fileRef) ){
          return fileRef;
        } else {
          throw new Error('not a valid file'); 
        }

      })

      .then(readJSFile)
      .then(buildFileReport)

      .then(function(report){
        if(isVerbose){ console.log('%s | %s', report.complexity, fileRef); }
        reportList.push(report);
      })

      .caught(function(err){
        failsList.push({ref : fileRef, message : err.message });
      })

      .finally(next);
      
  }

  this.getResults = function(){
    return {
      report : reportList,
      fails : failsList
    };
  }

}

module.exports = Reporter;