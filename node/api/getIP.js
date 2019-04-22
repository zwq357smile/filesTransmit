let express = require('express');
let router = express.Router();
let getIP = function() {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        if (alias.address) {
          return alias.address;
        }
      }
    }
  }
};

router.get('/getIP', function (req, res) {
  res.send({address: getIP()});
});

module.exports = router;
