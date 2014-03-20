var 
  fs = require('fs'),
  Promise = require('bluebird'),
  writeFile = Promise.promisify(fs.writeFile, fs),
  template = require('./template')
;

module.exports = function outputHTMLReport(data, filename){

  var html = template.evaluate({item : data, len : data.length});
  return writeFile(filename, html);

};