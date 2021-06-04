const fs = require('fs');
const path = require('path');

//获取文件地址
const filePath = path.resolve(__dirname, 'text.txt');

// 异步打开文件，写入，关闭
fs.open(filePath, 'a', (err, fd) => {
  if (err) {
    console.log('文件打开失败');
    return;
  }
  fs.write(fd, '异步写入内容', (err) => {
    if (err) {
      console.log('写入失败');
      return;
    }
    fs.close(fd, (err) => {
      if (err) {
        return;
        }
        console.log('文件关闭');
    });
  });
});
