#!/usr/bin/env node

var 
  path = require('path'),
  Promise = require('bluebird'),

  scan = require('../index'),
  getSpec = require('./lib/getSpec'),
  outputHTMLReport = require('./lib/outputHTMLReport'),
  outputCLIReport = require('./lib/outputCLIReport')
;

getSpec(function(path, skipped, isVerbose, outPutFileName){

  scan(path, skipped, isVerbose)

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

