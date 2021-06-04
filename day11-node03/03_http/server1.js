const http = require('http');

// 创建一个服务 回调函数中参数，request请求的对象 response响应对象
const server = http.createServer((request, response) => {
  //设置响应头Content-Type属性，响应类型和字符编码
  response.setHeader('Content-Type', 'text/html;charset=utf-8');
  // 返回响应内容
  response.end('nizhengbang');
});
let host = '127.0.0.1';
let port = '3000';
//给创建的服务添加端口和主机地址
server.listen(port, host, () => {
  console.log('点击访问' + `http://${host}:${port}`);
});
