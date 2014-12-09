#JScomplexity

JS cyclomatic complexity report generator.

Command-line tool and module to generate a complexity report on file tree Javascript files. It is based on [escomplex](https://github.com/philbooth/escomplex/) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

[![Build Status](https://travis-ci.org/slyg/jscomplexity.png?branch=master)](https://travis-ci.org/slyg/jscomplexity)

###Installation 

`npm install -g jscomplexity`

###Module usage

```javascript
var jscomplexity = require('jscomplexity');

// jscomplexity() returns a promise (using bluebird)
jscomplexity('/path/to/js/dir').then(console.log);

// you can also use CPS style
jscomplexity('/path/to/js/dir', function(err, result){
  if(err) {
    return console.log(err);
  }
  console.log(result);
});
```

###Command-line usage

```
Usage: jscomplexity [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --pattern <pattern>    glob pattern - default is current directory
    -o, --output <filename>    (optional) customize html report filename - default is 'jscomplexity-report.html'
    -r, --reporter <reporter>  (optional) specify a reporter: 'terminal', 'html' or 'all' - default is 'all'
    -v, --verbose              (optional) outputs analysisis logs
```

:warning: Linux/OSX compliant only (I haven't tested it on Windows).

Example : `jscomplexity -p '{./src/*.js,./src/**/*.js}'`

### Sample outputs (gremlins.js)

#### Terminal

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-console.png)

#### HTML report

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-webUI.png)

### Grunt task

See [grunt-jscomplexity-threshold](https://github.com/slyg/grunt-jscomplexity-threshold) module.
