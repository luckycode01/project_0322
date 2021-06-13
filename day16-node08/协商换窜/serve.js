// 导入express
const express = require('express');

const path = require('path');
// etag模块  文件标识
const etag = require('etag');
const { promisify } = require('util');

const fs = require('fs');

const { resolve6 } = require('dns');

const app = express();

app.get('/', async (req, res) => {
  const filePath = path.resolve(__dirname, 'index.html');
  const re = fs.createReadStream(filePath);

  // 获取请求的信息，请求头中的if-none-match 和if-modified-since
  console.log(req.headers['if-none-match'], req.headers['if-modified-since']);
  const ifNoneMatch = req.headers['if-none-match'];
  const ifModifiedSince = req.headers['if-modified-since'];

  // 获取文件标识，stat方法可以获取文件的详细信息
  // 使用promisify方法将stat包装为promis对象
  const stat = promisify(fs.stat);
  // 获取文件信息
  const fileDetail = await stat(filePath);
  // 获取文件的最后修改时间
  const fileLastTime = fileDetail.mtime.toGMTString();
  // 获取文件的唯一标识
  const fileEtag = etag(filePath);

  // 第二次请求，判断if-none-match和if-modified-since
  if (ifModifiedSince === fileLastTime && ifNoneMatch === fileEtag) {
    return res.status(304).end();
  }
  // 设置文件的唯一标识，最后修改时间（响应头）
  res.set('Etag', fileEtag);
  res.set('Last-Modified', fileLastTime);

  re.pipe(res);
});

app.listen('3000', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('服务已启动 点击访问：  http://127.0.0.1:3000');
});
