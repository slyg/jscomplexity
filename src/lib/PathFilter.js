var Promise = require('bluebird'),
    _ = require('lodash');

/**
 * Instanciates a path filter
 *
 * @param 'pathsToSkip'   The path to skip
 * @returns {Object}      Returns a PathFilter instance
 */

module.exports = function(pathsToSkip){

  var skippedRegExps = _.map(pathsToSkip, function(path){
    return new RegExp(path, 'g'); 
  });

  /**
   * Checks file extension and path, 
   * fulfills if ok, reject if not.
   * 
   * @param {String} 'fileRef'
   * @returns {Promise} fulfilled promise returns true
   */
   
  this.isValidFile = function(fileRef){

    return new Promise(function(resolve, reject){

      var isJavascriptFile = (/\.(js)$/i).test(fileRef),
          hasValidPath = !_.some(skippedRegExps, function(skipRegex){
            return fileRef.match(skipRegex);
          });

      (isJavascriptFile && hasValidPath) ? resolve(true) : reject(new Error('not a valid file'));

    });

  };

};