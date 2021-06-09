// 启动数据库
require('./db');
// 引入数据库集合
const userModel = require('./model/userModel');
//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');
// 创建App对象
const app = express();

// 官方静态资源中间件
app.use(express.static('./public'));
app.use(express.static('./static'));

// 处理req 请求携带的数据中间件 把req的属性放在req.body上
app.use(
  express.urlencoded({
    extends: true,
  })
);
// 中间件 处理账号密码是否位空
app.use((req, res, next) => {
  const { username, password } = req.query;
  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码不能为空',
    });
  }
  next();
});
// 账号密码正则 中间件
app.use((req, res, next) => {
  //查看用户输入内容 拿到用户名和密码
  const { username, password } = req.query;

  const userReg = /^[A-Z]{1}[0-9a-zA-Z_]{6,10}$/;
  const passReg = /^[0-9]{6}$/;
  if (!userReg.test(username) || !passReg.test(password)) {
    //拼接err.ejs的路径
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '账号和密码格式不对',
    });
  }

  next();
});

app.get('/login', async (req, res) => {
  const { username, password } = req.query;

  // 查找数据库中有没有用户
  const isUser = await userModel.findOne({ username });
  if (!isUser) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户不存在',
    });
  }
  // 用户存在，判断密码是否正确
  if (isUser.password != password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '密码错误',
    });
  }
  // 登录成功
  const filePath = path.resolve(__dirname, './public/center.html');
  res.sendFile(filePath);
});

// 注册
app.get('/register', async (req, res) => {
  const { username, password } = req.query;

  // 查找数据库中有没有用户
  const isUser = await userModel.findOne({ username });
  // 用户存在
  if (isUser) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户已存在',
    });
  }
  // 如果不存在，注册用户
  await userModel.create({
    username,
    password,
  });
  res.redirect('/login.html');
});

// 引入 ejs模块
const ejs = require('ejs');
// 通知express使用ejs模板引擎
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.get()

let port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`服务器启动成功，点击访问： http://127.0.0.1:${port}`);
});
