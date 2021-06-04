// const fs = require('fs');
// const path = require('path');

// // 获取写入文件的路径
// const filePath = path.resolve(__dirname, 'text.txt');

// //同步打开文件，若文件不存在就创建文件 fd 文件描述符
// const fd = fs.openSync(filePath, 'a');

// fs.writeSync(fd, '被酒莫惊春睡重，赌书消得泼茶香');

// fs.closeSync(fd);
// console.log('写入完毕，文件已关闭');

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'text.txt');
const fd = fs.openSync(filePath, 'a');
fs.writeSync(fd, '当时只道是寻常');
fs.closeSync(fd);
