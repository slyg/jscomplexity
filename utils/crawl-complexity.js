    
    var cr = require('escomplex'),
        fs = require('fs'),
        walk = require('walk'),
        Promise = require('bluebird'),
        treeWalker = require('escomplex-ast-moz'),
        esprima = require('esprima'),
        path = require('path'),
        readFile = Promise.promisify(fs.readFile, fs);
    

    function checkFileExtension(fileRef){

        var resolver = Promise.defer();

        if( !(/\.(js)$/i).test(fileRef) ) {
            resolver.reject(fileRef + ' is not a .js file');
        } else {
            resolver.fulfill(fileRef);
        }

        return resolver.promise
    }

    function readJSFile(fileRef){ 

        return readFile(fileRef, 'utf8').then(function(data){
            return {
                fileRef : fileRef,
                data : data
            };
        });
        
    }

    function buildFileReport(file){

        var report = cr.analyse( esprima.parse(file.data, {loc : true}),  treeWalker);

        var toBeDisplayed = {
            path            : file.fileRef,
            escapedPath     : file.fileRef.replace(/\\/g, '\\'), // windows use
            complexity      : report.aggregate.cyclomatic,
            lineNumber      : report.aggregate.sloc.physical,
            maintainability : report.aggregate.halstead.effort,
            halstead        : {
                length         : report.aggregate.halstead.length,
                vocabulary     : Math.round(report.aggregate.halstead.vocabulary),
                difficulty     : Math.round(report.aggregate.halstead.difficulty),
                bugs           : Math.round(report.aggregate.halstead.bugs)
            }
        };

        return toBeDisplayed;
        
    }

    function populateReportList(errStack, reportList){

        function populate(root, fileStats, next) {

            var fileRef = require('path').normalize(root + "/" + fileStats.name);

            checkFileExtension(fileRef)
                .then(readJSFile)
                .then(buildFileReport)
                .then(function(report){
                    reportList.push(report);
                })
                .then(next)
                .caught(function(err){
                    if (!errStack) errStack = [];
                    errStack.push({ref : fileRef, error : err });
                    next();
                });
            
        }

        return populate;

    }

    module.exports = function(path){
    
        var 
            reportList = [],
            walker = walk.walk(path),
            errStack = null,
            resolver = Promise.defer()
        ;      
    
        walker
            .on("file", populateReportList(errStack, reportList))
            .on("error", function(){ resolver.reject(errStack); })
            .on("end", function(){ resolver.resolve(reportList); })
        ;

        return resolver.promise;
    
    }
