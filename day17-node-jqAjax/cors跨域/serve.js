//导入express模块
const express = require('express');
// 创建App对象
const app = express();

app.get('/login', (req, res) => {
  const { user, pass, callback } = req.query;
  console.log(user, pass);

  //存在数组中的地址才能跨域
  const urlArr = ['http://127.0.0.1:3000/', 'http://127.0.0.1:3500/', 'http://127.0.0.1:5500/', 'http://127.0.0.1:4000/'];
  // console.log(req);
  console.log(urlArr.includes(req.headers.referer));
  if (urlArr.includes(req.headers.referer)) {
    res.set('Access-Control-Allow-Origin', req.headers.referer.slice(0, -1));
  }

  // 允许某一个地址跨域
  // res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  // 允许所有的地址跨域
  // res.set('Access-Control-Allow-Origin', '*');
  if (user === 'www' && pass === '123') {
    const data = {
      mes: 'ok',
      code: 1,
    };
    return res.send(`${callback}(${JSON.stringify(data)})`);
  }
  const err = {
    mes: 'error',
    code: 0,
  };
  return res.json(err);
});

let port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`服务器启动成功，点击访问： http://127.0.0.1:${port}`);
});
