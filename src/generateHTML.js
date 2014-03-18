var template = require('./template'),
    path = require('path'),
    Table = require('cli-table'),
    _ = require('lodash'),
    Promise = require('bluebird');

module.exports = function(data, dirPath){

  var table = new Table({
      head: ['File', 'Complexity'],
      colAligns : ['left', 'right'],
      colWidths: [80, 20],
      style : {compact : true}
  });

  _.forEach(data, function(item){
    table.push([item.path, item.complexity]);
  });

  console.log(table.toString());
    
  var computedDirPath = (dirPath || './');
  
  return template.evaluate({item : data, len : data.length});

};
