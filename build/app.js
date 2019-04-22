const packager = require('electron-packager')
const path = require('path')

process.env.NODE_ENV = 'production'


let buildConfig = {
  arch: 'x64',
  asar: true,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, '../build/icons/icon'),
  // ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static))|\.gitkeep/,
  out: path.join(__dirname, '../app'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'win32'
};

function bundleApp() {
  packager(buildConfig, (err, appPaths) => {
    if (err) {
      console.log(err + '\n');
    } else {
      console.log('success');
    }
  })
}

module.exports = bundleApp;
