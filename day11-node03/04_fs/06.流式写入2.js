const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'text.txt');

//创建可选流
const fd = fs.createWriteStream(filePath, { flag: 'a' });

//绑定事件，当可写流打开或关闭时触发
fd.on('open', () => {
  console.log('可写流打开，写入文件');
});
fd.on('close', () => {
  console.log('可写流 关闭，停止写入');
});
// 流式写入
fd.write('111');
fd.write('222');

fd.close();
