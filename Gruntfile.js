var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-istanbul-coverage');
grunt.loadNpmTasks('grunt-exec');

grunt.initConfig({

  jshint: {
    all : ['src/**/*.js', 'test/*.js', 'bin/**/*.js']
  },

  exec : {
    coverage : {
      cmd : 'npm run-script istanbul',
      stdout : false,
      stderr: false
    }
  },

  coverage: {
    options: {
      thresholds: {
        'statements': 90,
        'branches': 90,
        'lines': 90,
        'functions': 90
      },
      dir: '',
      root: 'coverage'
    }
  },

});


grunt.registerTask('validate', ['jshint:all', 'exec:coverage', 'coverage']);