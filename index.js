module.exports = function(srcDir, cb){

    var crawlComplexity = require('./utils/crawl-complexity');
    
    crawlComplexity(srcDir, function(err, report){ cb(err, report); });
    
}