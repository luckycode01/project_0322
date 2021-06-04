const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'text.txt');

//创建可选流
const fd = fs.createWriteStream(filePath, { flag: 'a' });

fd.on('open', () => {
  console.log('可选流打开，开始写入文件');
});
fd.on('close', () => {
  console.log('关闭可选流，停止写入');
});

fd.write('1');
fd.write('2');
fd.close();
