var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.initConfig({

  jshint: {
    all : ['src/**/*.js', 'test/*.js', 'bin/**/*.js']
  }

});

grunt.registerTask('default', ['jshint:all']);