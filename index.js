module.exports = function(srcDir, options){

    var crawlComplexity = require('./src/crawl-complexity');

    return crawlComplexity(srcDir);
    
}