# ffedit-static

**[FFedit](http://ffglitch.org/) static binaries for Mac OSX and Linux and Windows.**

Supports macOS (64-bit), Linux (64-bit) and Windows (64-bit). [The ffedit version currently used is `ffedit-0.8`.](https://github.com/pcktm/ffedit-static/releases/tag/ffedit-0.8)

## Installation

This module is installed via npm:

``` bash
$ npm install ffedit-static
```

*Note:* During installation, it will download the appropriate `ffedit` and `ffmpeg` binaries from the GitHub release. Use and distribution of the binary releases of FFedit are covered by their respective license.

## Example Usage

Returns the path of a statically linked ffmpeg binary on the local filesystem.

``` js
var paths = require('ffedit-static');
console.log(paths.ffedit);
//D:\pcktm\source\ffedit-static\ffedit.exe
console.log(paths.ffmpeg);
//D:\pcktm\source\ffedit-static\ffmpeg.exe
```

## Sources of the binaries

All the binaries are downloaded straight from [FFglitch official page](http://ffglitch.org/pub/bin/).

## Show your support
 
This npm package includes statically linked binaries that are produced by [Ramiro Polla](https://github.com/ramiropolla). Please consider supporting and donating to him for developing such a great tool for glitch artists.