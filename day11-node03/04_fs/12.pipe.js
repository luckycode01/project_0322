const fs = require('fs');
const path = require('path');
// 获取路径
const readFilePath = path.resolve(__dirname, '01.同步写入.js');
const writeFilePath = path.resolve(__dirname, 'text.txt');

//创建可读流
const re = fs.createReadStream(readFilePath, { flag: 'a' });

// 创建可写流
const wr = fs.createWriteStream(writeFilePath);

//pipe持续消费可读流数据，写入文件,并自动关闭
re.pipe(wr);
// 绑定end事件，监视可读流关闭
re.on('end', () => {
  console.log('文件读取完毕');
});
