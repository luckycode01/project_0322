const http = require('http');

//服务器地址
const url = 'http://127.0.0.1:3000';

//创建客户端
const client = http.request(url, (response) => {
  // console.log(response);
  console.log(response.statusCode);

  // 响应数据是一个可读流 绑定data监听
  response.on('data', (thunk) => {
    console.log(thunk.toString());
  });
  // 绑定监听，关闭可读流
  response.on('end', () => {
    console.log('响应完毕');
  });
});

//发送请求
client.end();
