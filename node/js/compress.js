// const imagemin = require('imagemin');
// const imageminWebp = require('imagemin-webp');
// const imageminJpegtran = require('imagemin-jpegtran');
// const ImageminGm = require('imagemin-gm')
// const imageminGm = new ImageminGm()
const Jimp = require('jimp');

function compress(url) {
  /* const files = imagemin([url], {
    plugins: [
      imageminWebp({
        quality: 100,
        method: 0,
        sharpness: 7,
        resize: {width: 100, height: 100}
      })
    ]
  }); */

  // return files;
  return Jimp.read(url);
  // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
}

module.exports = compress;
