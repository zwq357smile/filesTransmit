let express = require('express');
let router = express.Router();
let readDir = require('../js/readDir');

router.get('/loadDir', function (req, res) {
  let url = req.query.url;
  console.log(url);
  res.send(readDir(url));
});

module.exports = router;
