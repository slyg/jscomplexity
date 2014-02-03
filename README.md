#JScomplexity

JS cyclomatic complexity report generator.

Command-line tool and module to generate a complexity report on file tree Javascript files. It is based on [escomplex](https://github.com/philbooth/escomplex/) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

[![Build Status](https://travis-ci.org/slyg/jscomplexity.png?branch=master)](https://travis-ci.org/slyg/jscomplexity)

###Installation 

`npm install -g jscomplexity`


###Command-line usage

` $ jscr <target directoryS> [optional : generated report directory, defaults current] `

e.g.: `$ jscr .` will generate report in current directory, using it as root for file tree walk-through.


###Module usage

```javascript
var jscr = require('jscomplexity');
// jscr() returns a promise (using bluebird)
jscr('/path/to/js/dir').then(console.log);
```

:warning: Linux/OSX compliant only (I haven't tested it on Windows).
