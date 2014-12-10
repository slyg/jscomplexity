#global describe:true, it:false, beforeEach:false
#jshint -W030

chai = require('chai')
chaiAsPromised = require('chai-as-promised')
should = chai.should()
Promise = require('bluebird')

jscomplexity = require('../index')
analyse = require('../index').analyse

chai.use chaiAsPromised

TREE_WITHOUT_JS_FILE = 'test/fixture/withoutjs/*.js'
TREE_WITH_COMPLEX_FILES = 'test/fixture/complex/**/*.js'

EXPECTED_COMPLEX_FILES_REPORT = require('./expectations/complex-tree-results')
EXPECTED_NO_JS_FILE_REPORT =
  report: []
  fails: []


describe 'the required jscomplexity module', ->

  it 'should return a Promise', ->

    jscomplexity('/*js').should.be.an.instanceof Promise

  it 'should be rejected if (glob\'s) arguments <String:pattern> and <Object:options> are not valid', ->

    jscomplexity().should.be.rejected
    jscomplexity([]).should.be.rejected
    jscomplexity('').should.be.rejected
    jscomplexity('/*.js', []).should.be.rejected


  it 'should return an empty array when targeted folder doesn\'t contain .js files', (done) ->

    jscomplexity(TREE_WITHOUT_JS_FILE)
      .should.be.fulfilled
      .and.eventually.deep.equal(EXPECTED_NO_JS_FILE_REPORT)
      .and.notify done


  it 'should return the expected complex result', (done) ->

    @timeout 10000
    jscomplexity(TREE_WITH_COMPLEX_FILES)
      .should.be.fulfilled
      .and.eventually.deep.equal(EXPECTED_COMPLEX_FILES_REPORT)
      .and.notify done

describe 'the analyse function', ->

  it 'should be exposed by the module', ->

    analyse.should.be.a 'function'



