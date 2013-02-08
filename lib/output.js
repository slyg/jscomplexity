var 
    fs = require('fs'),
    handlebars = require('handlebars'),
    source = fs.readFileSync('./templates/report.hbs', "utf8"),
    template = handlebars.compile(source)
;

handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$notlast = !(index === arr.length-1);
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});

module.exports = function(data, dirPath){
    
    var 
        dirPath = dirPath || "./", // set default directory path
        reportFilePath = dirPath + "jscomplexityreport.html"
    ;
    
    var result = template({item : data});
    
    fs.writeFile(reportFilePath, result, function(err) {
        if(err) throw new Error(err);
        console.log("saved at " + reportFilePath);
    });
    
}