// 导入数据库
require('./db');

// 引入数据库集合
const userModel = require('./model/userModel');

//导入path模块
const path = require('path');
//导入express模块
const express = require('express');
const { send } = require('process');
const { static } = require('express');
// 创建express对象
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//官方静态资源中间件
app.use(express.static('./public'));
app.use(express.static('./static'));

// 处理req请求数据的中间件，将  req的数据放在req.body上
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 处理账号密码是否为空的中间件
app.use((req, res, next) => {
  const { username, password } = req.query;
  //判断是用户名或密码是否为空
  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    res.render(filePath, {
      errData: '用户名或密码为空',
    });
  }
  // 处理完后还需要向下执行，需要调用next
  next();
});
// 用户输入用户名和密码正则
app.use((req, res, next) => {
  const { username, password } = req.query;
  const userReg = /^[A-Z]{1}[A-z]{6,8}$/;
  const passReg = /^[0-9]{6}$/;
  if (!userReg.test(username) || !passReg.test(password)) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码格式不对',
    });
  }
});

// 登录接口
app.get('/login', async (req, res) => {
  const { username, password } = req.query;
  // 判断密码是否正确
  if (isUser.password != password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    res.render(filePath, {
      errData: '密码错误',
    });
  }
  const filePath = path.resolve(__dirname, './public/center.html');
  return res.sendFile(filePath);
});

// 注册接口
app.get('/register', async (req, res) => {
  const { username, password } = req.query;
  //判断是用户名或密码是否为空
  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    res.render(filePath, {
      errData: '用户名或密码为空',
    });
  }
  // 判断用户名是否重复
  const isUser = await userModel.findOne({ username });
  if (isUser) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    res.render(filePath, {
      errData: '用户已存在',
    });
  }
  await userModel.create({ username, password });
  res.redirect('/login.html');
});

let port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`服务器启动成功，点击连接访问： http://127.0.0.1:${port}`);
});
