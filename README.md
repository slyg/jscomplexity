#JScomplexity


Command-line tool to generate a complexity report on file tree Javascript files. It is based on [escomplex](https://github.com/philbooth/escomplex/) module results. Report stands in a .html file containing graphical representation of file tree when used from command-line.

:warning: Linux/OSX compliant only (I haven't tested it on Windows).


###Installation 

<code>npm install [-g] jscomplexity</code>


###Command-line usage

` $ jscr &lt;directory containing JS&gt; [optional : &lt;generated report directory, defaults current&gt;] `

e.g.: `$ jscr .` will generate report in current directory, using it as root for file tree walk-through.


###Module usage

```javascript
var jscr = require('jscomplexity');
// jscr() returns a promise (using bluebird)
jscr('/path/to/js/dir').then(console.log);
```
