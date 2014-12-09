var
  Table = require('cli-table'),
  _ = require('lodash')
;

module.exports = function logReport(report){

  var table = new Table({
    head: ['File', 'Complexity'],
    colAligns : ['left', 'right'],
    colWidths: [80, 20],
    style : {compact : true}
  });

  _.each(report, function(item){
    table.push([item.path, item.complexity]);
  });

  console.log(table.toString());

};