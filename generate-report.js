#!/usr/bin/env node

    var 
        crawlComplexity = require('./utils/crawl-complexity'),
        srcDir = process.argv[2],
        outputDir = process.argv[3],
        output = require('./utils/output')
    ;
    
    crawlComplexity(srcDir, function(err, report){ if(!err) output(report, outputDir); });
    
    
    


