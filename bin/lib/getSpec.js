/*jshint -W079 */
var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../../package.json'),
    options = {
      pattern : './**',
      isVerbose : false,
      outputFileName : 'jscomplexity-report.html',
      reporter : 'all'
    };

program
  .version(pjson.version)
  .usage('[options]')
  .option('-p, --pattern <pattern>', 'glob pattern - default is current directory')
  .option('-o, --output <filename>', '(optional) customize html report filename - default is \''+ options.outputFileName +'\'')
  .option('-r, --reporter <reporter>', '(optional) specify a reporter: \'terminal\', \'html\' or \'all\'  - default is \'all\'')
  .option('-v, --verbose', '(optional) outputs analysisis logs')
  .parse(process.argv);

if(program.verbose) {
  options.isVerbose = true;
}
if(program.pattern){
  options.pattern = program.pattern;
}
if(program.output){
  options.outputFileName = program.output;
}
if(program.reporter){
  options.reporter = program.reporter;
}

module.exports = function getSpec(callback){
  return callback(
    options.pattern,
    {},
    options.isVerbose,
    options.outputFileName,
    options.reporter
  );
};