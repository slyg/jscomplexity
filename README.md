#JScomplexity

JS cyclomatic complexity report generator.

Command-line tool and module to generate a complexity report on file tree Javascript files. It is based on [escomplex](https://github.com/philbooth/escomplex/) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

[![Build Status](https://travis-ci.org/slyg/jscomplexity.png?branch=master)](https://travis-ci.org/slyg/jscomplexity)

###Installation 

`npm install -g jscomplexity`


###Command-line usage

```
Usage: jscr [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -t, --target <folder>    change root folder to analyse - default is current directory
    -s, --skip <folder>      skip a folder
    -o, --output <filename>  customize html report filename - default is 'jscr-report.html'
    -v, --verbose            outputs analysisis logs
```


###Module usage

```javascript
var jscr = require('jscomplexity');
// jscr() returns a promise (using bluebird)
jscr('/path/to/js/dir').then(console.log);
```

:warning: Linux/OSX compliant only (I haven't tested it on Windows).
