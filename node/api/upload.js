let express = require('express');
let router = express.Router();
let fs = require('fs');
let mutipart = require('connect-multiparty');

let mutipartMiddeware = mutipart();

router.post('/upload', mutipartMiddeware, function (req, res) {
  let path = req.files.uploadFile.path;
  let name = `${req.body.name}\\${req.files.uploadFile.originalFilename}`;
  fs.copyFile(path, name, (err) => {
    if (!err) res.send(JSON.stringify({message: 'success'}));
    else console.log('copyFile:' + err);
  });
  fs.unlink(path, (err) => {
    err && console.log('unlink:' + err);
  })
});

module.exports = router;
