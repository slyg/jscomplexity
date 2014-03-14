var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../package.json'),
    options = {
      targetedTree : './',
      getOutputFileName : 'jscr-report.html',
      skippedDirectories : []
    };

program
  .version(pjson.version)
  .usage('[options] [<folder to analyse ...>]');

program
  .command('*')
  .action(function(target){
    options.targetedTree = target;
  });

program
  .option('-s, --skip <folder>', 'skip a folder', function(folder){
    options.skippedDirectory = folder;
  });

module.exports.parse = function(argv){
  return new Promise(function (resolve) {
    program.parse(argv);
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