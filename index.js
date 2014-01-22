module.exports = function(srcDir){

    var crawlComplexity = require('./src/crawl-complexity');

    return crawlComplexity(srcDir);
    
}