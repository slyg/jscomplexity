#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird'),
    writeFile = Promise.promisify(fs.writeFile, fs),

    argvParser = require('../src/argv-parser'),
    crawlComplexity = require('../src/crawl-complexity'),
    generateHTML = require('../src/generateHTML');


argvParser.parse(process.argv)
  .then(argvParser.getTargetedTree)
  .then(crawlComplexity)
  .then(function(data){

    var filename = argvParser.getOutputName(),
        html = generateHTML(data.report)

    return writeFile(filename, html);

  })

  .then(function(){
    process.exit(0);
  })
  .caught(function(err){
    console.log(err);
    process.exit(1);
  });


