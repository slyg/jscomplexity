var jscr = require('./index');

jscr('./utils', function(err, report){
    
    console.log(report);
    console.log(err)
    
});