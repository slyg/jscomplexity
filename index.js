module.exports = function(srcDir, cb){ console.log(srcDir);

    var crawlComplexity = require('./utils/crawl-complexity');
    
    crawlComplexity(srcDir, function(err, report){ cb(err, report); });
    
}
