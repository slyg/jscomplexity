var template = require('./template'),
    path = require('path'),
    Promise = require('bluebird');

module.exports = function(data, dirPath){
    
  var computedDirPath = (dirPath || './');
  
  return template.evaluate({item : data, len : data.length});

};
