var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../package.json'),
    options = {
      targetedTree : './',
      isVerbose : false,
      getOutputFileName : 'jscr-report.html',
      skippedDirectories : []
    };

program
  .version(pjson.version)
  .usage('[options]');

program
  .option('-t, --target <folder>', 'change root folder to analyse - default is current directory')
  .option('-o, --output <filename>', 'customize html report filename - default is \''+ options.getOutputFileName +'\'')
  .option('-v, --verbose', 'outputs analysisis logs')
  .option('-s, --skip <patterns>', 'skip path pattern during tree walk - matched items will be skipped from report', function(patterns){
    return patterns.split(',');
  });

module.exports.parse = function(argv){
  return new Promise(function (resolve) {

    program.parse(argv);

    if(program.verbose) {
      options.isVerbose = true;
    }

    if(program.target){
      options.targetedTree = program.target;
    }

    if(program.output){
      options.getOutputFileName = program.output;
    }

    if(program.skip){
      options.skippedDirectories = program.skip;
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