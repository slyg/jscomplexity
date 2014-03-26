module.exports = function(srcDir, skippedDirectories, isVerbose, callback){

    var scanner = require('./src/scan');
    return scanner(srcDir, skippedDirectories, isVerbose).nodeify(callback);
    
}