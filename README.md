# JScomplexity

JS cyclomatic complexity report generator.

Command-line tool and module that generates a report of Javascript files complexity. It is based on [escomplex](https://github.com/philbooth/escomplex/) module's results.

In 'html' mode, command-line tool will create an .html file report containing graphical representation of files complexity and lines of code count.

[![Build Status](https://travis-ci.org/slyg/jscomplexity.png?branch=master)](https://travis-ci.org/slyg/jscomplexity)

### Installation 

`npm install -g jscomplexity`

### Module usage

```js
var jscomplexity = require('jscomplexity');

// jscomplexity() returns a promise (using bluebird)
jscomplexity('/glob/pattern/to/js/*' [, globOptions]).then(console.log);

// you can also use CPS style
jscomplexity('/glob/pattern/to/js/*', {}, function(err, result){
  if(err) {
    return console.log(err);
  }
  console.log(result);
});
```

### Command-line usage

```
Usage: jscomplexity [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --pattern <pattern>    glob pattern - default is current directory
    -o, --output <filename>    (optional) customize html report filename - default is 'jscomplexity-report.html'
    -r, --reporter <reporter>  (optional) specify a reporter: 'terminal', 'html' or 'all' - default is 'terminal'
```

:warning: Linux/OSX compliant only (I haven't tested it on Windows).

CLI Example : `jscomplexity -p '{src/*.js,src/**/*.js,!src/config/**}'`

### Sample outputs (gremlins.js)

#### Terminal

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-console.png)

#### HTML report

![alt tag](https://raw.github.com/slyg/jscomplexity/master/images/screenshot-webUI.png)

### Grunt task

See [grunt-jscomplexity-threshold](https://github.com/slyg/grunt-jscomplexity-threshold) module.
