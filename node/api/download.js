let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/load', function (req, res) {
  let path = req.query.url;
  let name = encodeURI(req.query.name);
  let f = fs.createReadStream(path);
  res.writeHead(200, {
    'contentType': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + name,
    'Pragma': 'No-cache',
    'Cache-Control': 'No-cache, No-store, max-age=0, must-revalidate'
  });
  f.pipe(res);
});

module.exports = router;
