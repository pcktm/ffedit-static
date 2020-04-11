'use strict'

const it = require('tape')
const path = require('path')
const fs = require('fs')
const paths = require('..')

it("should find ffmpeg", function (t) {
  t.ok(path.isAbsolute(paths.ffmpeg));

  var stats = fs.statSync(paths.ffmpeg);
  t.ok(stats.isFile(paths.ffmpeg));

  t.doesNotThrow(() => {
    fs.accessSync(paths.ffmpeg, fs.constants.X_OK);
  }, "ffmpeg not executable");

  t.end();
});

it('should find ffedit', function(t) {
  t.ok(path.isAbsolute(paths.ffedit));

  var stats = fs.statSync(paths.ffedit);
  t.ok(stats.isFile(paths.ffedit));

  t.doesNotThrow(()=> {
    fs.accessSync(paths.ffedit, fs.constants.X_OK);
  }, "ffedit not executable");

  t.end();
});
