const express = require('express');
const path = require('path');
const fs = require('fs');

const zlib = require('zlib');

const app = express();

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, './index.html');
  const rs = fs.createReadStream(filePath);

  // 获取压缩格式;
  console.log(req.headers['accept-encoding']);
  const acceptEncoding = req.headers['accept-encoding'];
  if (acceptEncoding.includes('gzip')) {
    const fileZlib = rs.pipe(zlib.createGzip());
    res.set('Content-Encoding', 'gzip');
    return fileZlib.pipe(res);
  }
  if (acceptEncoding.includes('deflate')) {
    const fileDeflate = rs.pipe(zlib.createDeflate());
    res.set('Content-Encoding', 'deflate');
    return fileDeflate.pipe(res);
  }

  if (acceptEncoding.includes('br')) {
    const fileBr = rs.pipe(zlib.createBrotliDecompress());
    res.set('Content-Encoding', 'br');
    return fileBr.pipe(res);
  }

  rs.pipe(res);
});

app.listen('3000', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('服务器启动成功，点击连接访问 ：　http://127.0.0.1:3000');
});
