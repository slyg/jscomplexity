/*jshint -W079 */
var Promise = require('bluebird'),
    escomplex = require('escomplex'),
    treeWalker = require('escomplex-ast-moz'),
    esprima = require('esprima'),
    fs = require('fs'),
    readFileAsync = Promise.promisify(fs.readFile, fs);

/**
 * Promise of a complexity analysis of a single file
 *
 * @param {String} 'fileRef'    The file path
 * @returns {Promise}           The fulfilled promise returns the report {Object}
 */

module.exports = function analyse (fileRef){

  return readFileAsync(fileRef, 'utf8')

    .then(function(fileData){

      return escomplex.analyse(
        esprima.parse(fileData, {loc : true}),
        treeWalker
      );

    })

    .then(function(report){

      return {
        path            : fileRef,
        escapedPath     : fileRef.replace(/\\/g, '\\'), // windows use
        complexity      : report.aggregate.cyclomatic,
        lineCount       : report.aggregate.sloc.logical,
        functionCount   : report.functions.length,
        maintainability : Math.round(report.aggregate.halstead.effort),
        halstead        : {
          length         : report.aggregate.halstead.length,
          vocabulary     : Math.round(report.aggregate.halstead.vocabulary),
          difficulty     : Math.round(report.aggregate.halstead.difficulty),
          bugs           : Math.round(report.aggregate.halstead.bugs)
        }
      };

    })

  ;

};
