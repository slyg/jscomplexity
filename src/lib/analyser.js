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

  this.isVerbose = isVerboseParam || false;

  /**
   * Populates report with informations about one file
   *
   * @param {String} 'root'       The file folder's path
   * @param {Object} 'fileStats'  The informations about current file
   * @returns {Promise}           The promise shall always be fulfilled
   */

  this.analyse = function (fileRef) {

    return Promise.resolve()

      .then(function(){
        return readFileAsync(fileRef, 'utf8');
      })

      .then(function(data){
        return createFileReport(fileRef, data);
      })

      .then(function(result){
        if (this.isVerbose) {
          console.log('%s | %s', result.complexity, fileRef);
        }
        return {
          success : true,
          result : result
        };
      }.bind(this))

      .caught(function(err){
        return {
          success : false,
          error : err
        };
      });

  };

}

module.exports = Analyser;
