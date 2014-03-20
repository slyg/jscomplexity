#!/usr/bin/env node

var 
  path = require('path'),
  Promise = require('bluebird'),

  cliArgParser = require('./lib/argv-parser'),
  crawlComplexity = require('../src/crawl-complexity'),
  outputHTMLReport = require('./lib/outputHTMLReport'),
  outputCLIReport = require('./lib/outputCLIReport')
;

cliArgParser.getSpec(function(path, skipped, isVerbose, outPutFileName){

  crawlComplexity(path, skipped, isVerbose)

    .then(function(data){
      var report = data.report;
      return Promise.join(
        outputHTMLReport(report, outPutFileName), 
        outputCLIReport(report)
      );
    })

    .then(function(){
      process.exit(0);
    })

    .caught(function(err){
      console.log(err);
      process.exit(1);
    });

});

