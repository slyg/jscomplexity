var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../package.json');

var targetedTree = './',
    outputName = 'jscomplexityreport.html',
    optionsHandler = {};

program
  .version(pjson.version)
  .usage('[<folder to analyse ...>] [options]');

program
  .command('*')
  .action(function(target){
    targetedTree = target;
  });

module.exports.parse = function(argv){
  return new Promise(function (resolve) {
    program.parse(argv);
    resolve(targetedTree);
  });
};

module.exports.getTargetedTree = function(){
  return targetedTree;
};

module.exports.getOutputName = function(){
  return outputName;
};