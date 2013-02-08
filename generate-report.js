
    var 
        crawlComplexity = require('./lib/crawl-complexity'),
        path = process.argv[2],
        outputDir = process.argv[3],
        output = require('./lib/output')
    ;
    
    crawlComplexity(path, function(report){ output(report, outputDir); });
    
    
    


