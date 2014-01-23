var template = require('./template'),
    path = require('path')
    Promise = require('bluebird');

module.exports = function(data, dirPath){
    
  var computedDirPath = (dirPath || './');
  
  return result = template.evaluate({item : data, len : data.length});

};
