const express = require('express');
const app = express();
const path = require('path');
const ip = require('./js/ipAddress');

// 跨域设置,路由拦截
app.all('*', function (req, res, next) {
  if (req.path !== '/') {
    res.header('Access-Control-Allow-Credentials', true);
    // 这里获取 origin 请求头 而不是用 *
    res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    if (req.path.match(/\/(\w*\.)+css\??/)) res.header('Content-Type', 'text/css;charset=utf-8');
    else res.header('Content-Type', 'application/json;charset=utf-8');
  }
  next();
});

app.use('/r', require('./api/loadDir'));
app.use('/r', require('./api/getIP'));
app.use('/file', require('./api/getImage'));
app.use('/file', require('./api/download'));
app.use('/token', require('./api/setToken'));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(8034, () => {
  console.log(`server running @ http://${ip()}:8034`);
});
