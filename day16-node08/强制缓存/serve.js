const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, './index.html');
  res.sendFile(filePath);
});

// 强制缓存
app.get('/img', (req, res) => {
  const filePath = path.resolve(__dirname, '../../day15-node07/0_login/static/1.webp');
  const rs = fs.createReadStream(filePath);
  // 设置强制缓存
  res.set('Cache-Control', 'max-age=10000');
  rs.pipe(res);
});

app.listen('3000', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('服务已经启动  http://127.0.0.1:3000');
});
