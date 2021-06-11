//导入express模块
const express = require('express');
// 创建App对象
const app = express();

app.get('/login', (req, res) => {
  const { user, pass, callback } = req.query;
  console.log(user, pass);
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
