var fs = require('fs'),
    template = require(__dirname + '/templates'),
    path = require('path');

module.exports = function(data, dirPath){
    
    var computedDirPath = (dirPath || "./"), // set default directory path
        reportFilePath = path.resolve(computedDirPath + "/jscomplexityreport.html");
    
    var result = template.evaluate({item : data, len : data.length});
    
    fs.writeFile(reportFilePath, result, function(err) {
        if(err) {
            throw new Error(err);
        }
    });
    
};
