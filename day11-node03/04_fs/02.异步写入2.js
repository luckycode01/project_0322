const fs = require('fs');
const path = require('path');

//获取文件路径
const filePath = path.resolve(__dirname, 'text.txt');

//异步打开文件，写入、关闭
fs.open(filePath, 'a', (err, fd) => {
  if (err) {
    return;
  }
  fs.write(fd, '异步写入2', (err) => {
    if (err) {
      return;
    }
    fs.close(fd, (err) => {
      if (err) {
        return;
      }
    });
  });
});
