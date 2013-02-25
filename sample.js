var jscr = require('./index');

jscr('./utils', function(err, report){
    
    if (!err) console.log(report);
    
});