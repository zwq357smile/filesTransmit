let express = require('express');
let router = express.Router();
let fs = require('fs');
let compress = require('../js/compress');

router.get('/download', function (req, res) {
  let url = req.query.url;
   downloadUrl(url).then((needCompress) => {
    if (needCompress) {
      compress(url).then((data) => {
        data
          .resize(100, -1)
          .getBufferAsync(-1)
          .then(function (buffer) {
            res.send(buffer);
        })
      });
    } else {
      res.sendFile(url);
    }
  });
  /* downloadUrl(url).then((needCompress) => {
    if (needCompress) {
      compress(url).then((data) => {
        res.send(data[0].data);
      });
    } else {
      res.sendFile(url);
    }
  }); */
});

function downloadUrl(path) {
  return new Promise((resolve) => {
    fs.stat(path, (err, stats) => {
      if (err) return;
      let needCompress = stats.size > 500000;
      resolve(needCompress);
    });
  });
}

module.exports = router;
