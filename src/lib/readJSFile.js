var Promise = require('bluebird'),
    fs = require('fs'),
    readFile = Promise.promisify(fs.readFile, fs);

/**
 * Reads JS file
 *
 *   returns a Promise
 *   rejects promise if an error occurs while reading file
 *   fulfilled promise returns a file spec object containing 
 *     - the passed file reference (relative path)
 *     - the stringified file content
 */
 
function readJSFile(fileRef){ 

    return readFile(fileRef, 'utf8').then(function(data){
        return {
            fileRef : fileRef,
            data : data
        };
    });
    
}

module.exports = readJSFile;