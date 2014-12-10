/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash'),
    glob = require('glob'),
    globAsync = Promise.promisify(glob),
    path = require('path')
;

var reportAsync = require('./report');

/**
 * Scan a file tree seeking for js files and generates a complexity report
 *
 * @public
 * @param {String}    'pattern'       The glob pattern
 * @param {Array}     'globOptions'   The glob options
 * @param {Function}  'callback'      cps callback function (optional)
 * @returns {Promise}                 The fulfilled promise returns the final report
 */

module.exports = function scan(pattern, globOptions, callback){

  // Sanity Checks
  if (
    !_.isString(pattern) ||
    _.isEmpty(pattern) ||
    (globOptions && !_.isPlainObject(globOptions))
  ){
    return Promise.reject(new Error('Invalid parameter type')).nodeify(callback);
  }

  // Generate files reports promises array
  var filesReports = globAsync(pattern, globOptions)
    .map(function(file){
      return reportAsync(file);
    });

  // when files reports promises are fulfilled,
  // generate a global report
  return filesReports.then(function(results){

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

  }).nodeify(callback);

};
