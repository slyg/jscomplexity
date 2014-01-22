#!/usr/bin/env node

    var 
        crawlComplexity = require('./src/crawl-complexity'),
        srcDir = process.argv[2],
        outputDir = process.argv[3],
        output = require('./src/output')
    ;

    crawlComplexity(srcDir).then(function(data){
    	output(data.report, outputDir);
    }).caught(console.log);
    
    
    


