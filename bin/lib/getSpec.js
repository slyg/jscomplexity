/*jshint -W079 */
var program = require('commander'),
    Promise = require('bluebird');

var pjson = require('../../package.json'),
    options = {
      pattern : './**',
      isVerbose : false,
      outputFileName : 'jscomplexity-report.html',
      reporter : 'terminal'
    };

program
  .version(pjson.version)
  .usage('[options]')
  .option(
    '-p, --pattern <pattern>',
    'glob pattern - default is current directory'
  )
  .option(
    '-o, --output <filename>',
    '(optional) customize html report filename - default is \''+ options.outputFileName +'\''
  )
  .option(
    '-r, --reporter <reporter>',
    '(optional) specify a reporter: \'terminal\', \'html\' or \'all\' - default is \'terminal\''
  )
  .parse(process.argv);

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
    options.outputFileName,
    options.reporter
  );
};
