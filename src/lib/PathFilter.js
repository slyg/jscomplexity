var _ = require('lodash');

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

        var isJavascriptFile = (/\.(js)$/i).test(fileRef),
            hasValidPath = !_.some(skippedRegExps, function(skipRegex){
                return fileRef.match(skipRegex);
            });

        return (isJavascriptFile && hasValidPath);

    }

}

module.exports = PathFilter;