#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird'),
    writeFile = Promise.promisify(fs.writeFile, fs),

    argvParser = require('../src/argv-parser'),
    crawlComplexity = require('../src/crawl-complexity'),
    generateHTML = require('../src/generateHTML');


argvParser.parse(process.argv)

  .then(argvParser.getSpec)
  .then(function(specs){

    var path = specs.targetedTree;
    var skipped = specs.skippedDirectories;
    var isVerbose = specs.isVerbose

    return crawlComplexity(path, skipped, isVerbose);
    
  })
  .then(function(data){

    var filename = argvParser.getOutputFileName(),
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


