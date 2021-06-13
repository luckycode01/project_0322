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
  // 接收请求时获取请求头携带的if-none-match 和 if-modified-since信息
  console.log(req.headers);
  const ifNoneMatch = req.headers['if-none-match'];
  const ifModifiedSince = req.headers['if-modified-since'];
  console.log(ifNoneMatch, ifModifiedSince);

  const filePath = path.resolve(__dirname, './index.html');
  const rs = fs.createReadStream(filePath);

  // fs的stat方法可以得到文件详细信息，
  // 使用promisify()方法把stat方法包装成promise对象
  const stat = promisify(fs.stat);
  // 获取文件详细信息
  const fileDetail = await stat(filePath);
  // 获取文件的最后修改时间
  const fileLastTime = fileDetail.mtime.toGMTString();
  // 获取文件标识
  const fileEtag = etag(fileDetail);

  // 协商缓存，判断最后修改时间和文件标识
  if (ifNoneMatch === fileEtag && ifModifiedSince === fileLastTime) {
    return res.status(304).end();
  }

  // 设置响应头 ，添加文件唯一标识和最后修改时间
  res.set('Etag', fileEtag);
  res.set('Last-Modified', fileLastTime);

  rs.pipe(res);
});

app.listen('3000', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('服务已启动 点击访问：  http://127.0.0.1:3000');
});
