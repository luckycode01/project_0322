const fs = require('fs');
const path = require('path');
const readFilePath = path.resolve(__dirname, '01.同步写入.js');
const writeFilePath = path.resolve(__dirname, '01.同步写入1.js');

// 创建可读流
const re = fs.createReadStream(readFilePath);
// 创建可写流
const wr = fs.createWriteStream(writeFilePath, { flag: 'a' });

//绑定事件
re.on('data', (chunk) => {
  console.log('打开可读流，读取文件，写入文件');
  wr.write(chunk);
});
re.on('end', () => {
  wr.close();
});
wr.on('close', () => {
  console.log('问价写入完毕');
});
