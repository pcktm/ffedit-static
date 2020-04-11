'use strict'

const os = require('os')
const path = require('path')

const binaries = Object.assign(Object.create(null), {
  darwin: ['x64'],
  linux: ['x64'],
  win32: ['x64']
})

const platform = os.platform()
const arch = os.arch()

var ffmpeg = path.join(
  __dirname,
  platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
)

var ffedit = path.join(
  __dirname,
  platform === "win32" ? "ffedit.exe" : "ffedit"
);

if (!binaries[platform] || binaries[platform].indexOf(arch) === -1) {
  ffmpeg = null
  ffedit = null
}

module.exports = {ffmpeg, ffedit}
