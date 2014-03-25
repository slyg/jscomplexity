var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../../package.json'),
    options = {
      targetedTree : './',
      isVerbose : false,
      outputFileName : 'jscr-report.html',
      skippedDirectories : []
    };

program
  .version(pjson.version)
  .usage('[options]')
  .option('-t, --target <folder>', 'change root folder to analyse - default is current directory')
  .option('-o, --output <filename>', 'customize html report filename - default is \''+ options.outputFileName +'\'')
  .option('-v, --verbose', 'outputs analysisis logs')
  .option('-s, --skip <patterns>', 'skip path pattern during tree walk - matched items will be skipped from report', function(patterns){
    return patterns.split(',');
  })
  .parse(process.argv);

if(program.verbose) {
  options.isVerbose = true;
}
if(program.target){
  options.targetedTree = program.target;
}
if(program.output){
  options.outputFileName = program.output;
}
if(program.skip){
  options.skippedDirectories = program.skip;
} 

module.exports = function getSpec(callback){
  return callback(
    options.targetedTree,
    options.skippedDirectories,
    options.isVerbose,
    options.outputFileName
  );
};