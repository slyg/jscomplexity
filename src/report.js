/*jshint -W079 */
var Promise = require('bluebird'),
    _ = require('lodash');

var analyse = require('./analyse');

/**
 * Promise of a report on a single file
 *
 * @param {String} 'fileRef'    The file's path
 * @returns {Promise}           The promise shall always be fulfilled
 */

module.exports = function report (fileRef) {

  return Promise.resolve(fileRef)

    .then(analyse)

    .then(function(result){

      return {
        success : true,
        result : result
      };

    })

    .caught(function(err){

      return {
        success : false,
        error : err
      };

    });

};
