#!/usr/bin/env node

    var 
        crawlComplexity = require('./lib/crawl-complexity'),
        srcDir = process.argv[2],
        outputDir = process.argv[3],
        output = require('./lib/output')
    ;
    
    crawlComplexity(srcDir, function(report){ output(report, outputDir); });
    
    
    


