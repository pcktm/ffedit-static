'use strict'

const fs = require("fs");
const os = require("os");
const {encode: encodeQuery} = require('querystring')
const {strictEqual} = require('assert')
const envPaths = require('env-paths')
const FileCache = require('http-basic/lib/FileCache').default
const request = require('http-basic')
const ffeditPaths = require(".");
const ora = require("ora");
const pkg = require("./package");

const exitOnError = (err) => {
  console.error(err)
  process.exit(1)
}

if (!ffeditPaths.ffedit) {
  exitOnError('ffedit-static install failed: No binary found for architecture')
}
// https://advancedweb.hu/how-s3-signed-urls-work/
const normalizeS3Url = (url) => {
  url = new URL(url)
  if (url.hostname.slice(-17) !== '.s3.amazonaws.com') return url.href
  const query = Array.from(url.searchParams.entries())
  .filter(([key]) => key.slice(0, 6).toLowerCase() !== 'x-amz-')
  .reduce((query, [key, val]) => ({...query, [key]: val}), {})
  url.search = encodeQuery(query)
  return url.href
}
strictEqual(
  normalizeS3Url('https://example.org/foo?bar'),
  'https://example.org/foo?bar'
)
strictEqual(
  normalizeS3Url('https://github-production-release-asset-2e65be.s3.amazonaws.com/29458513/26341680-4231-11ea-8e36-ae454621d74a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20200405%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200405T225358Z&X-Amz-Expires=300&X-Amz-Signature=d6415097af04cf62ea9b69d3c1a421278e96bcb069afa48cf021ec3b6941bae4&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=attachment%3B%20filename%3Ddarwin-x64&response-content-type=application%2Foctet-stream'),
  'https://github-production-release-asset-2e65be.s3.amazonaws.com/29458513/26341680-4231-11ea-8e36-ae454621d74a?actor_id=0&response-content-disposition=attachment%3B%20filename%3Ddarwin-x64&response-content-type=application%2Foctet-stream'
)


if (!fs.existsSync(envPaths(pkg.name).cache)) {
  fs.mkdirSync(envPaths(pkg.name).cache, { recursive: true });
}

const cache = new FileCache(envPaths(pkg.name).cache)
cache.getCacheKey = (url) => {
  return FileCache.prototype.getCacheKey(normalizeS3Url(url))
}

function downloadFile(url, destinationPath, name) {
  let fulfill, reject;
  let totalBytes = 0;
  const spinner = ora("Downloading " + name).start();

  const promise = new Promise((x, y) => {
    fulfill = x;
    reject = y;
  });

  request('GET', url, {
    followRedirects: true,
    maxRedirects: 3,
    gzip: true,
    cache,
    timeout: 30 * 1000, // 30s
    retry: true,
  }, (err, response) => {
    if (err || response.statusCode !== 200) {
      err = err || new Error('Download failed.')
      if (response) {
        err.url = response.url
        err.statusCode = response.statusCode
      }
      spinner.fail("Something went wrong");
      reject(err)
      return;
    }

    const file = fs.createWriteStream(destinationPath);
    file.on("finish", () => {
      spinner.succeed("Downloaded " + name);
      fulfill();
    });
    file.on("error", error => {
      spinner.fail("Something went wrong");
      reject(error);
    });
    response.body.pipe(file)
  });
  return promise;
}

const release = pkg['ffedit-static'].binary_release
const FFeditDownloadUrl = `https://github.com/pcktm/ffedit-static/releases/download/${release}/ffedit-${os.platform()}-${os.arch()}`;
const FFmpegDownloadUrl = `https://github.com/pcktm/ffedit-static/releases/download/${release}/ffgac-${os.platform()}-${os.arch()}`;

downloadFile(FFeditDownloadUrl, ffeditPaths.ffedit, `FFedit (${os.platform()})`)
  .then(() => {
    fs.chmodSync(ffeditPaths.ffedit, 0o755); // make executable
  })
  .catch(exitOnError)

  .then(() =>
    downloadFile(FFmpegDownloadUrl, ffeditPaths.ffmpeg, `FFgac (${os.platform()})`)
  )
  .then(() => {
    fs.chmodSync(ffeditPaths.ffgac, 0o755); // make executable
  })
  .catch(exitOnError);
