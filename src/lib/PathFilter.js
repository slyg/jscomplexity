var Promise = require('bluebird'),
    _ = require('lodash');

/**
 * Instanciate a path filter
 *
 *   @param 'pathsToSkip' pathsToSkip to skip
 *
 *   @attribute #isToSkip()
 * 
 */

function PathFilter(pathsToSkip){

    var skippedRegExps = _.map(pathsToSkip, function(path){
        return new RegExp(path, 'g'); 
    });

    /**
     * Checks file extension and path
     * 
     * @param {String} fileRef
     * @return {Boolean}
     */
     
    this.isValidFile = function(fileRef){

        return new Promise(function(resolve, reject){

            var isJavascriptFile = (/\.(js)$/i).test(fileRef),
                hasValidPath = !_.some(skippedRegExps, function(skipRegex){
                    return fileRef.match(skipRegex);
                });

            (isJavascriptFile && hasValidPath) ? resolve() : reject(new Error('not a valid file'));

        });

    };

}

module.exports = PathFilter;