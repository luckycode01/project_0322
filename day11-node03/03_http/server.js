const http = require('http');

const fs = require('fs');
const path = require('path');
// const readFilePath = path.resolve(__dirname, '1.jpg');
const readFilePath = path.resolve(__dirname, '罗盘时钟.html');

const server = http.createServer((request, response) => {
  // response.setHeader('Content-Type', 'text/plain;charset=utf-8');
  console.log('请求你了');
  // response.end('hellow word');

  fs.readFile(readFilePath, (err, data) => {
    if (err) {
      response.end('资源不存在');
      return;
    }
    // response.setHeader('Content-Type', 'image/png;charset=utf-8');
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.end(data);
  });
});

server.listen('3000', '192.168.17.39', () => {
  console.log('服务器运行中');
});
