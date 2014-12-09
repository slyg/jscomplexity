#!/usr/bin/env node
/*jshint -W079 */
var
  Promise = require('bluebird'),

  scan = require('../index'),
  getSpec = require('./lib/getSpec'),
  outputHTMLReport = require('./lib/outputHTMLReport'),
  outputCLIReport = require('./lib/outputCLIReport')
;

getSpec(function(pattern, globOptions, isVerbose, outPutFileName, reporter){

  scan(pattern, globOptions, isVerbose)

    .then(function(data){

      var report = data.report,
          jobs = [];

      switch (reporter){
        case 'html' :
          jobs.push(outputHTMLReport(report, outPutFileName));
          break;
        case 'terminal' :
          jobs.push(outputCLIReport(report));
          break;
        default :
          jobs.push(outputHTMLReport(report, outPutFileName));
          jobs.push(outputCLIReport(report));
          break;
      }

      return Promise.all(jobs);

    })

    .then(function(){
      process.exit(0);
    })

    .caught(function(err){
      console.log(err);
      process.exit(1);
    });

});
