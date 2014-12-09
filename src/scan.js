/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    glob = require('glob'),
    globAsync = Promise.promisify(glob),
    path = require('path')
;

var Analyser = require('./lib/analyser');

/**
 * Scan a file tree seeking for js files and generates a complexity report
 *
 * @public
 * @param {String}  'pattern'             The glob pattern
 * @param {Array}   'globOptions'         The glob options
 * @param {Boolean} 'isVerbose'           The log stdout option
 * @returns {Promise}                     The fulfilled promise returns the final report
 */

module.exports = function (pattern, globOptions, isVerbose){

  return new Promise(function (resolve, reject) {

    if (
      !_.isString(pattern) ||
      _.isEmpty(pattern) ||
      (globOptions && !_.isPlainObject(globOptions))
    ){
      reject(new Error('Invalid parameter type'));
    }

    globAsync(pattern, globOptions)

      .then(function (files) {

        var reporter = new Analyser(isVerbose ? isVerbose : false),
            filesReports = [];

        _.each(files, function(file){
          filesReports.push(reporter.analyse(file));
        });

        Promise.all(filesReports).then(function(){
          resolve(reporter.getResults());
        });

      })

      .caught(reject);

  });

};
