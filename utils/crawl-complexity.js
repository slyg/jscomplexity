
    var 
        cr = require('complexity-report'),
        fs = require('fs'),
        walk = require('walk')
    ;
    
    module.exports = function(path, cb){
    
        var 
            reportList = [],
            walker = walk.walk(path),
            errStack = null
        ;
    
        walker
            .on("file", function (root, fileStats, next) {
            
                var fileRef = require('path').normalize(root + "/" + fileStats.name);
                
                if( (/\.(js)$/i).test(fileRef) ) {
                    
                    fs.readFile(fileRef, 'utf8', function(err, data){
                        if (err) throw new Error (err, fileRef);
                        try {
                            var report = cr.run(data);
                            var toBeDisplayed = {
                                path            : fileRef,
                                escapedPath     : fileRef.replace(/\\/g, '\\'), // windows use
                                complexity      : report.aggregate.complexity.cyclomatic,
                                lineNumber      : report.aggregate.complexity.sloc.physical,
                                maintainability : report.maintainability,
                                halstead        : {
                                    length         : report.aggregate.complexity.halstead.length,
                                    vocabulary     : Math.round(report.aggregate.complexity.halstead.vocabulary),
                                    difficulty     : Math.round(report.aggregate.complexity.halstead.difficulty),
                                    bugs           : Math.round(report.aggregate.complexity.halstead.bugs)
                                }
                            };
                            reportList.push(toBeDisplayed);
                            next();
                        } catch(e){ 
                            if (!errStack) errStack = [];
                            errStack.push({ref : fileRef, error : e}); 
                            next(); 
                        }
                        
                    });
                    
                } else { next(); }
                
            })
            .on("error", function(){ cb(errStack, reportList); })
            .on("end", function(){ cb(errStack, reportList); })
        ;
    
    }