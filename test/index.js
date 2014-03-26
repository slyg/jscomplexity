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
  scanner = require('../index'),
  expectedComplexRes = require('./complex-tree-results'),
  expectedSkipRes = require('./skip-results'),
  expectedEmptyRes = {
    report : [],
    fails : [
      {ref: 'test/tree/withoutjs/stuff', message : 'not a valid file'}
    ]
  };

chai.use(chaiAsPromised);

describe('the complexity scanner', function () {

  it('should be a Promise', function(){

    expect(scanner(treePath))
      .to.be.an.instanceof(Promise);

  });

});

describe('the complexity scanner promise', function () {

  it('should return an empty array when targeted folder doesn\'t contain .js files', function(done){

    expect(scanner(treePathWithoutJSFile))
      .to.be.fulfilled
      .and.to.eventually.deep.equal(expectedEmptyRes)
      .and.notify(done);
    
  });

  it('should return the attended complex result', function(done){

    this.timeout(10000);

    expect(scanner(treePathComplex))
      .to.eventually.deep.equal(expectedComplexRes)
      .to.be.fulfilled
      .and.notify(done);
    
  });

  it('should return the attended complex result when a skip folder path is passed', function(done){

    this.timeout(10000);

    expect(scanner(treePathComplex, ['/tree/complex/jquery']))
      .to.eventually.deep.equal(expectedSkipRes)
      .to.be.fulfilled
      .and.notify(done);
    
  });

});