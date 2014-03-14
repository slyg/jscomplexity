/*global describe:true, it:false, beforeEach:false*/
/*jshint -W030*/

var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect,
  Promise = require('bluebird'),
  treePath = 'test/tree',
  treePathWithoutJSFile = treePath + '/withoutjs',
  treePathComplex = treePath + '/complex',
  treePathCrash = '/crash',
  treePathNotExisting = '/doesntexist',
  crawler = require('../src/crawl-complexity'),
  expectedComplexRes = require('./complex-tree-results'),
  expectedSkipRes = require('./skip-results'),
  expectedEmptyRes = { report : [], errors : null };

chai.use(chaiAsPromised);

describe('the complexity crawler', function () {

  it('should be a Promise', function(){

    expect(crawler(treePath))
      .to.be.an.instanceof(Promise);

  });

});

describe('the complexity crawler promise', function () {

  it('should return an empty array when targeted folder doesn\'t contain .js files', function(done){

    expect(crawler(treePathWithoutJSFile))
      .to.eventually.deep.equal(expectedEmptyRes)
      .and.notify(done);
    
  });

  it('should return an empty array when targeted folder doesn\'t exist', function(done){

    expect(crawler(treePathWithoutJSFile))
      .to.eventually.deep.equal(expectedEmptyRes)
      .and.notify(done);
    });

  it('should return the attended complex result', function(done){

    this.timeout(10000);

    expect(crawler(treePathComplex))
      .to.eventually.deep.equal(expectedComplexRes)
      .to.be.fulfilled.and.notify(done);
    
  });

  it('should return the attended complex result when a skip folder path is passed', function(done){

    this.timeout(10000);

    expect(crawler(treePathComplex, '/tree/complex/jquery'))
      .to.eventually.deep.equal(expectedSkipRes)
      .to.be.fulfilled.and.notify(done);
    
  });

});