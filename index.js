module.exports = function(srcDir){ console.log(srcDir);

    var crawlComplexity = require('./utils/crawl-complexity');
    
    crawlComplexity(srcDir, function(report){ console.log(report) });
    
}
