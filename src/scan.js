/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    glob = require('glob'),
    globAsync = Promise.promisify(glob),
    path = require('path')
;

var reportAsync = require('./lib/report');

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

        var filesReports = [];

        _.each(files, function(file){
          filesReports.push(reportAsync(file, isVerbose ? isVerbose : false));
        });

        Promise.all(filesReports)

          .then(function(results){

            return Promise.props({

              report : Promise
                .filter(results, function(result){
                  return result.success;
                })
                .map(function(result){
                  return result.result;
                })
                .then(function(results){
                  return _.chain(results).sortBy('complexity').reverse().value();
                }),

              fails : Promise
                .filter(results, function(result){
                  return !result.success;
                })
                .map(function(result){
                  return result.error;
                })

            });

          })

          .then(resolve);

      })

      .caught(reject);

  });

};
