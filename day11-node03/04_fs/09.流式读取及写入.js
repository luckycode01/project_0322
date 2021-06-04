const fs = require('fs');
const path = require('path');
const readFilePath = path.resolve(__dirname, '01.同步写入.js');
const writeFilePath = path.resolve(__dirname, '01.同步写入1.js');

// 创建可读流，创建可写流
const re = fs.createReadStream(readFilePath);
const wr = fs.createWriteStream(writeFilePath, { flag: 'a' });

//绑定data事件
re.on('data', (chunk) => {
  console.log(chunk);
  wr.write(chunk);
});
//绑定end事件
re.on('end', () => {
  wr.close();
});
wr.close();
