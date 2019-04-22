let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
  let token = req.query.token;
  global.token = token || global.token;
  res.send(global.token);
});

module.exports = router;
