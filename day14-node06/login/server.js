// 连接数据库
require('./db');

// 引入模块
const express = require('express');
//path模块
const path = require('path');

const userModel = require('./model/userModel');

//创建expre的application 对象
const app = express();

// 注册接口
app.get('/register', async (req, res) => {
  //解构获取username,pass
  console.log(req.query);
  const { username, password } = req.query;

  if (!username || !password) return res.send('用户名或密码不能为空');

  // 判断当前用户是否被注册
  const isUser = await userModel.findOne({ username });
  if (isUser) return res.send('用户名已经被注册');

  // 向数据库添加信息
  const registerData = await userModel.create({
    username,
    password,
  });
  console.log(registerData);
  res.send('注册成功');
});

// 登陆接口
app.get('/login', async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) return res.send('用户名或密码不能为空');

  // 根据username去数据库查询是否存在该用户
  const isUser = await userModel.findOne({ username });
  if (!isUser) return res.send('用户不存在');
  // 用户存在判断密码是否正确
  console.log(isUser);
  if (isUser.password === password) {
    return res.send('登录成功');
  }
  return res.send('密码错误');
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

//监听端口号和服务器状态
let port = '3000';
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('服务器启动，可以访问此链接:' + ` http://127.0.0.1:${port}`);
});
