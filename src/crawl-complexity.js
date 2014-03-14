    
    var cr = require('escomplex'),
        fs = require('fs'),
        walk = require('walk'),
        Promise = require('bluebird'),
        treeWalker = require('escomplex-ast-moz'),
        esprima = require('esprima'),
        path = require('path'),
        readFile = Promise.promisify(fs.readFile, fs);
    

    /**
     * Checks file extension
     *
     *   returns a Promise
     *   rejected promise if not .js
     *   fulfilled promise returns the passed file reference (path)
     */
    function checkFileExtension(fileRef){ 

        var resolver = Promise.defer();

        if( !(/\.(js)$/i).test(fileRef) ) {
            resolver.reject(fileRef + ' is not a .js file');
        } else {
            resolver.fulfill(fileRef);
        }

        return resolver.promise;
    }

    /**
     * Reads JS file
     *
     *   returns a Promise
     *   rejects promise if an error occurs while reading file
     *   fulfilled promise returns a file spec object containing 
     *     - the passed file reference (relative path)
     *     - the stringified file content
     */
    function readJSFile(fileRef){ 

        return readFile(fileRef, 'utf8').then(function(data){
            return {
                fileRef : fileRef,
                data : data
            };
        });
        
    }

    /**
     * Builds final complexity report of
     * a given file from file spec
     *
     *   returns a report hash
     *   crashes if an error occurs (especially while esprima parsing)
     */
    function buildFileReport(fileSpec){

        var report;

        try {
            report = cr.analyse( esprima.parse(fileSpec.data, {loc : true}),  treeWalker);
        } catch(e){
            throw new Error('parsing error');
        }

        var toBeDisplayed = {
            path            : fileSpec.fileRef,
            escapedPath     : fileSpec.fileRef.replace(/\\/g, '\\'), // windows use
            complexity      : report.aggregate.cyclomatic,
            lineNumber      : report.aggregate.sloc.logical,
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

    /**
     * initializes a high-level function context 
     * with error and report containers
     *
     *   returns a Function
     */
    function populateReportList(errorsList, reportList){

        /**
         * Populates error and report stack objects 
         * from a file spec
         *
         *  returns undefined
         *  triggers next() callback when done
         */
        function populate(root, fileStats, next) {

            var fileRef = require('path').normalize(root + "/" + fileStats.name);

            checkFileExtension(fileRef)
                .caught(next) // fire 'next' if extension is not correct
                .then(readJSFile)
                .then(buildFileReport)
                .then(function(report){
                    reportList.push(report);
                })
                .caught(function(err){
                    if(!errorsList) errorsList = [];
                    errorsList.push({ref : fileRef, error : err });
                    next();
                })
                .finally(next);
            
        }

        return populate;

    }

    /**
     *
     */

    function formatOptions(rawOptions){

        var formattedOptions = {
            followLinks: false
        };

        if(rawOptions){

            if(
                rawOptions.skippedDirectories 
                && rawOptions.skippedDirectories.length > 0
            ) {
                formattedOptions.filters = rawOptions.skippedDirectories;
            }

        }

        return formattedOptions;
    }

    /**
     * builds a complexity report of .js files 
     * found in a file tree from a given path
     *
     *   returns a Promise
     *   rejects promise if any runtime error occurs
     */
    function crawlComplexity(path, options){

        var 
            reportList = [],
            errorsList = null,
            resolver = Promise.defer()
        ;

        walker = walk.walk(path, formatOptions(options));
    
        walker
            .on("file", populateReportList(errorsList, reportList))
            .on("error", function(){ resolver.reject('runtime error'); })
            .on("end", function(){
                resolver.resolve({
                    report : reportList,
                    errors : errorsList
                }); 
            })
        ;

        return resolver.promise;

    }

    module.exports = crawlComplexity;
