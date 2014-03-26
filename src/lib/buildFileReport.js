var cr = require('escomplex'),
    treeWalker = require('escomplex-ast-moz'),
    esprima = require('esprima');

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

module.exports = buildFileReport;