// 引入模块
const express = require('express');
//path模块
const path = require('path');

//创建expre的application 对象
const app = express();

const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, 'index.ejs');

  res.render(filePath, {
    data: 'AAAAAAAAAAAAAAAAAAA',
    name: '王七蛋',
    dataList: [
      {
        name: 'aaa',
        sex: 'men',
        age: 18,
      },
      {
        name: 'bbb',
        sex: 'women',
        age: 18,
      },
      {
        name: 'ccc',
        sex: 'men',
        age: 18,
      },
      {
        name: 'ddd',
        sex: 'women',
        age: 18,
      },
    ],
  });
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
