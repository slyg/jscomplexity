module.exports = function(srcDir){

    var crawlComplexity = require('./utils/crawl-complexity');

    return crawlComplexity(srcDir);
    
}