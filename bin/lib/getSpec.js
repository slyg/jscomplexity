var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../../package.json'),
    options = {
      targetedTree : './',
      isVerbose : false,
      outputFileName : 'jscr-report.html',
      skippedDirectories : [],
      reporter : 'all'
    };

program
  .version(pjson.version)
  .usage('[options]')
  .option('-t, --target <folder>', 'change root folder to analyse - default is current directory')
  .option('-o, --output <filename>', '(optional) customize html report filename - default is \''+ options.outputFileName +'\'')
  .option('-r, --reporter <reporter>', '(optional) specify a reporter: \'terminal\', \'html\' or \'all\'  - default is \'all\'')
  .option('-v, --verbose', '(optional) outputs analysisis logs')
  .option('-s, --skip <patterns>', '(optional) skip path pattern during tree walk - matched items will be skipped from report', function(patterns){
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
if(program.reporter){
  options.reporter = program.reporter;
}
if(program.skip){
  options.skippedDirectories = program.skip;
}

module.exports = function getSpec(callback){
  return callback(
    options.targetedTree,
    options.skippedDirectories,
    options.isVerbose,
    options.outputFileName,
    options.reporter
  );
};