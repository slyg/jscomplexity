var Promise = require('bluebird')
    fs = require('fs'),
    readFile = Promise.promisify(fs.readFile, fs);

var PathFilter = require('./PathFilter'),
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

  this.populate = function (fileRef, next) {

    var pathFilter = new PathFilter(skipPaths);

    return Promise.resolve()

      .then(function(){
        return pathFilter.isValidFile(fileRef);
      })
      .then(function(){
        return readFile(fileRef, 'utf8');
      })
      .then(function(data){
        return buildFileReport(fileRef, data);
      })
      .then(function(report){
        if(isVerbose){ console.log('%s | %s', report.complexity, fileRef); }
        reportList.push(report);
      })
      .caught(function(err){
        failsList.push({ref : fileRef, message : err.message });
      })
      .finally(next);
      
  };

  /**
   * Returns report
   * 
   * @returns {Object} The report object
   */

  this.getResults = function(){
    return {
      report : reportList,
      fails : failsList
    };
  };

}

module.exports = Reporter;