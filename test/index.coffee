#global describe:true, it:false, beforeEach:false

#jshint -W030
chai = require('chai')
chaiAsPromised = require('chai-as-promised')
expect = chai.expect
Promise = require('bluebird')
scanner = require('../index')

chai.use chaiAsPromised


treePath = 'test/tree'
treePathWithoutJSFile = treePath + '/withoutjs'
treePathComplex = treePath + '/complex'
treePathCrash = '/crash'
treePathNotExisting = '/doesntexist'

expectedComplexRes = require('./complex-tree-results')
expectedSkipRes = require('./skip-results')
expectedEmptyRes =
  report: []
  fails: [
    ref: 'test/tree/withoutjs/stuff'
    message: 'not a valid file'
  ]


describe 'the complexity scanner', ->

  it 'should return a Promise', ->
    expect(scanner(treePath)).to.be.an.instanceof Promise


describe 'the complexity scanner promise', ->

  it 'should return an empty array when targeted folder doesn\'t contain .js files', (done) ->

    expect(scanner(treePathWithoutJSFile)).to.be.fulfilled.and.to.eventually.deep.equal(expectedEmptyRes).and.notify done


  it 'should return the attended complex result', (done) ->

    @timeout 10000
    expect(scanner(treePathComplex)).to.eventually.deep.equal(expectedComplexRes).to.be.fulfilled.and.notify done


  it 'should return the attended complex result when a skip folder path is passed', (done) ->

    @timeout 10000
    expect(scanner(treePathComplex, ['/tree/complex/jquery'])).to.eventually.deep.equal(expectedSkipRes).to.be.fulfilled.and.notify done



