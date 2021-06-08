// 连接数据库
require('./db');

// 引入模块
const express = require('express');
//path模块
const path = require('path');
//引入ejs模块
const ejs = require('ejs');

const userModel = require('./model/userModel');

//创建expre的application 对象
const app = express();

//使用ejs模板引擎
app.set('view engine', 'ejs');
app.set('views', 'views');

// 注册接口
app.get('/register', async (req, res) => {
  //解构获取username,pass
  console.log(req.query);
  const { username, password } = req.query;

  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码不能为空',
    });
  }

  // 判断当前用户是否被注册
  const isUser = await userModel.findOne({ username });
  if (isUser) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户名已经被注册',
    });
  }

  // 向数据库添加信息
  const registerData = await userModel.create({
    username,
    password,
  });
  res.redirect('/login.html');
});

// 登陆接口
app.get('/login', async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码不能为空',
    });
  }
  // 根据username去数据库查询是否存在该用户
  const isUser = await userModel.findOne({ username });
  if (!isUser) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '用户不存在',
    });
  }
  // 用户存在判断密码是否正确
  console.log(isUser);
  if (isUser.password != password) {
    const filePath = path.resolve(__dirname, './public/err.ejs');
    return res.render(filePath, {
      errData: '密码错误',
    });
  }
  const centePath = path.resolve(__dirname, './public/center.html');
  return res.sendFile(centePath);
});

// 访问根目录 重定向
app.get('/', (req, res) => {
  res.redirect('/index.html');
});
// 访问index
app.get('/index.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/index.html');
  res.sendFile(filePath);
});
// 访问login
app.get('/login.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/login.html');
  res.sendFile(filePath);
});
// 访问register
app.get('/register.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/register.html');
  res.sendFile(filePath);
});
// 图片请求接口
app.get('/static/:src', (req, res) => {
  const { src } = req.params;
  const filePath = path.resolve(__dirname, './static', src);
  res.sendFile(filePath);
});

//监听端口号和服务器状态
let port = '3000';
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('服务器启动，可以访问此链接:' + ` http://127.0.0.1:${port}`);
});
