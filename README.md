#jscomplexity


Command-line tool to generate a complexity report on file tree Javascript files. It is based on [complexityReport.js](https://github.com/philbooth/complexityReport.js) module results. Report stands in a .html file containing graphical representation of file tree.

NB: /!\ Linux/OS compliant only for now.


###Installation 

<code>npm install -g jscomplexity</code>


###Usage

<code> $ jscr &lt;directory containing JS&gt; [optional : &lt;generated report directory, defaults current&gt;] </code>

e.g.: 
<code>$ jscr .</code>
will generate report in current directory, using it as root for file tree walk-through.
