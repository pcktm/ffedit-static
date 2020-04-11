# ffedit-static

**[FFedit](http://ffglitch.org/) static binaries for Mac OSX and Linux and Windows.**

Supports macOS (64-bit), Linux (64-bit) and Windows (64-bit). [The ffedit version currently used is `ffedit-0.8`.](https://github.com/eugeneware/ffmpeg-static/releases/tag/b4.2.2)

## Installation

This module is installed via npm:

``` bash
$ npm install ffedit-static
```

*Note:* During installation, it will download the appropriate `ffedit` binary from the GitHub release. Use and distribution of the binary releases of FFedit are covered by their respective license.

## Example Usage

Returns the path of a statically linked ffmpeg binary on the local filesystem.

``` js
var pathToFfedit = require('ffedit-static');
console.log(pathToFfedit);
```

```
/Users/j/playground/node_modules/ffedit-static/ffedit
```

## Sources of the binaries

[The build script](build/index.sh) downloads binaries from [FFglitch official page](http://ffglitch.org/pub/bin/).

The build script extracts build information and (when possible) the license file from the downloaded package or the distribution server.

## Show your support
 
This npm package includes statically linked binaries that are produced by [Ramiro Polla](https://github.com/ramiropolla). Please consider supporting and donating him for developing such a great tool for glitch artists.


## Building the project

The `unzip`, `tar` and `7zr` CLI executables need to be installed. On macOS, use `brew install p7zip gnu-tar xz`.
