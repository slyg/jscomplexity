#JScomplexity

JS cyclomatic complexity report generator.

Command-line tool and module to generate a complexity report on file tree Javascript files. It is based on [escomplex](https://github.com/philbooth/escomplex/) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

[![Build Status](https://travis-ci.org/slyg/jscomplexity.png?branch=master)](https://travis-ci.org/slyg/jscomplexity)

###Installation 

`npm install -g jscomplexity`

###Module usage

```javascript
var jscr = require('jscomplexity');

// jscr() returns a promise (using bluebird)
jscr('/path/to/js/dir').then(console.log);

// you can also use CPS style
jscr('/path/to/js/dir', function(err, result){
  if(err) {
    return console.log(err);
  }
  console.log(result);
});
```

###Command-line usage

```
Usage: jscr [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -t, --target <folder>    change root folder to analyse - default is current directory
    -s, --skip <pattern>     skip path pattern during tree walk - matched items will be skipped from report
    -o, --output <filename>  customize html report filename - default is 'jscr-report.html'
    -v, --verbose            outputs analysisis logs
```

:warning: Linux/OSX compliant only (I haven't tested it on Windows).


### Sample outputs (gremlins.js)

#### Terminal

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-console.png)

#### HTML report

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-webUI.png)

### Grunt task

See [grunt-jscomplexity-threshold](https://github.com/slyg/grunt-jscomplexity-threshold) module.
