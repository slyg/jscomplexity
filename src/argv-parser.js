var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../package.json'),
    options = {
      targetedTree : './',
      isVerbose : false,
      getOutputFileName : 'jscr-report.html',
      skippedDirectory : undefined
    };

program
  .version(pjson.version)
  .usage('[options]');

program
  .option('-t, --target <folder>', 'change root folder to analyse - default is current directory', function(folder){
    options.targetedTree = folder;
  })
  .option('-s, --skip <pattern>', 'skip path pattern during tree walk - matched items will be skipped from report', function(pattern){
    options.skippedDirectory = pattern;
  })
  .option('-o, --output <filename>', 'customize html report filename - default is \''+ options.getOutputFileName +'\'', function(filename){
    options.getOutputFileName = filename;
  })
  .option('-v, --verbose', 'outputs analysisis logs');

module.exports.parse = function(argv){
  return new Promise(function (resolve) {

    program.parse(argv);

    if(program.verbose) {
      options.isVerbose = true;
    }

    resolve(options.targetedTree);
  });
};

module.exports.getSpec = function(){
  return options;
};

module.exports.getTargetedTree = function(){
  return options.targetedTree;
};

module.exports.getOutputFileName = function(){
  return options.getOutputFileName;
};