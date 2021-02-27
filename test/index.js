'use strict'

const it = require('tape')
const path = require('path')
const fs = require('fs')
const paths = require('..')

it("should find ffgac", function (t) {
  t.ok(path.isAbsolute(paths.ffgac));

  var stats = fs.statSync(paths.ffgac);
  t.ok(stats.isFile(paths.ffgac));

  t.doesNotThrow(() => {
    fs.accessSync(paths.ffgac, fs.constants.X_OK);
  }, "ffgac not executable");

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
