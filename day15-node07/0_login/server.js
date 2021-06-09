// 连接启动数据库
require('./db');
// 引入express模块
const express = require('express');
// 创建app对象
const app = express();

app.use(express.static('./public'));
app.use(express.static('./static'));

//处理req请求携带的数据的中间件，将req的属性放到req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 引入ejs模块
const ejs = require('ejs');
// 通知使用ejs模板引擎
app.set('view engine', 'ejs');
app.set('views', 'views');

// 引入session模块
const session = require('express-session');
// 设置session中间件
app.use(
  session({
    secret: 'mamamamam', //参与加密的窜
    resave: false, //没有修改sessio，就不会保存
    saveUninitialized: true, //没有存储之前不设置session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

// 引入请求模块
const isEmptyRouter = require('./router/isEmpty');
const regRouter = require('./router/reg');
const loginRouter = require('./router/login');
const registerRouter = require('./router/register');
const centerRouter = require('./router/centerRouter');

app.use(isEmptyRouter);
app.use(regRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(centerRouter);

// 引入open模块，自动打开浏览器
const open = require('./util/open');

let port = 3000;
// 监听服务器启动
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`服务器启动成功，点击访问： http://127.0.0.1:${port}`);
  open('http://127.0.0.1', port);
});
