//导入express模块
const express = require('express');
// 创建App对象
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, './index.html');
  res.sendFile(filePath);
});

/* app.get('/login', (req, res) => {
  const { user, pass } = req.query;
  console.log(user, pass);
  if (user === 'xiaoma' && pass === '123') {
    const data = {
      mes: 'ok',
      code: 1,
    };
    return res.json(data);
  }
  const err = {
    mes: 'error',
    code: 0,
  };
  return res.json(err);
});
 */
// 引入body-parserr中间件，处理post请求数据
const bodyParser = require('body-parser');
// 如果post请求发送的是json数据、
app.use(bodyParser.json());
// 如果发送的是form表单格式
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  console.log(user, pass);
  if (user === 'xiaoma' && pass === '123') {
    const data = {
      mes: 'ok',
      code: 1,
    };
    return res.json(data);
  }
  const err = {
    mes: 'error',
    code: 0,
  };
  return res.json(err);
});
app.get('/login', (req, res) => {
  const { user, pass } = req.query;
  console.log(user, pass);
  if (user === 'www' && pass === '123') {
    const data = {
      mes: 'ok',
      code: 1,
    };
    return res.json(data);
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
