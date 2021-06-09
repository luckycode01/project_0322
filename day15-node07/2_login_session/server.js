// 启动数据库
require('./db');
//导入express模块
const express = require('express');
// 创建App对象
const app = express();

// 官方静态资源中间件
app.use(express.static('./public'));
app.use(express.static('./static'));

const session = require('express-session');
// 设置session中间件
app.use(
  session({
    secret: 'keyboardcat', //参与加密的串
    saveUninitialized: false, // 没有存之前 不创建session
    resave: false, //没有修改session就不会重新保存
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

// 处理req 请求携带的数据中间件 把req的属性放在req.body上
app.use(
  express.urlencoded({
    extends: true,
  })
);

// 引入 ejs模块
const ejs = require('ejs');
// 通知express使用ejs模板引擎
app.set('view engine', 'ejs');
app.set('views', 'views');  

const regRouter = require('./router/reg');
const isEmptyRouter = require('./router/isEmpty');
const loginRouter = require('./router/login');
const registerRouter = require('./router/register');
const centerRouter = require('./router/centerRouter');

app.use(regRouter);
app.use(isEmptyRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(centerRouter);

let port = 3000;
const open = require('./util/open');
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`服务器启动成功，点击访问： http://127.0.0.1:${port}`);
  open('http://127.0.0.1', port);
});
