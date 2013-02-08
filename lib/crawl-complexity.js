
    var 
        cr = require('complexity-report'),
        fs = require('fs'),
        walk = require('walk')
    ;
    
    module.exports = function(path, cb){
    
        var reportList = [];
        var walker = walk.walk(path);
    
        walker
            .on("file", function (root, fileStats, next) {
            
                var fileRef = root + "/" + fileStats.name;
                
                if( (/\.(js)$/i).test(fileRef) ) {
                
                    
                    fs.readFile(fileRef, 'utf8', function(err, data){
                        if (err) throw err;
                        var report = cr.run(data);
                        reportList.push({
                            path : fileRef,
                            complexity : report.aggregate.complexity.cyclomatic,
                            lineNumber : report.aggregate.complexity.sloc.physical
                        });
                        next();
                    });
                    
                } else { next(); }
                
            })
            .on("end", function() { cb(reportList); })
        ;
    
    }