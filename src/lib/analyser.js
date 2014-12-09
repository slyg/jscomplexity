/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    fs = require('fs'),
    readFileAsync = Promise.promisify(fs.readFile, fs);

var createFileReport = require('./createFileReport');

/**
 * Analyser contructor
 *
 * @public
 * @param {Array} 'skipPaths'     The paths pattern to skip from report
 * @param {Boolean} 'isVerbose'   The verbose mode, ouput info on each added item
 * @returns {Object} returns a Analyser instance
 */

function Analyser(isVerboseParam){

  var
    resolver = Promise.defer(),
    isVerbose = isVerboseParam || false
  ;

  this.reportList = [];
  this.failsList = [];

  /**
   * Populates report with informations about one file
   *
   * @param {String} 'root'       The file folder's path
   * @param {Object} 'fileStats'  The informations about current file
   * @returns {Promise}           The promise shall always fulfill
   */

  this.analyse = function (fileRef) {

    return Promise.resolve()

      .then(function(){
        return readFileAsync(fileRef, 'utf8');
      })
      .then(function(data){
        return createFileReport(fileRef, data);
      })
      .then(function(report){
        if (isVerbose) {
          console.log('%s | %s', report.complexity, fileRef);
        }
        this.reportList.push(report);
      }.bind(this))
      .caught(function(err){
        this.failsList.push({ref : fileRef, message : err.message });
      }.bind(this));

  };

  /**
   * Returns report
   *
   * @returns {Object} The report object
   */

  this.getResults = function(){
    return {
      report : _.chain(this.reportList).sortBy('complexity').reverse().value(),
      fails : this.failsList
    };
  };

}

module.exports = Analyser;