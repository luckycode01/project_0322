//模块引入练习
// const { add } = require('./module_add');
// console.log(add(1, 2, 3, 4, 5));

// // const {sub} = require('./moudel_sub');
// // console.log(sub(1,2));

// const sub = require('./moudel_sub');
// console.log(sub(1, 2));


// // buffer练习
// // 创建一个指定的buffer
// console.log(Buffer.alloc(9, 'abc'));
// // 创建一个未初始化的buffer
// console.log(Buffer.allocUnsafe(10));
// //将数据转为buffer
// console.log(Buffer.from('abc'));
// // 将buffer转为数据
// buf = Buffer.from('abc');
// console.log(buf);
// console.log(buf.toString());

// const proc = process.argv;
// if (proc[2] === 'start') {
//   console.log('正在启动');
// } else if(proc[2] === 'end'){
//   console.log('正在关闭');
// }
// else {
//   console.log('参数错误');
// }

// let i = 1;
// setInterval(() => {
//   console.log(i++);
//   if (i>4) {
//     process.exit();
//   }
// }, 1);\\


// path练习
// const path = require('path');
// console.log(path.resolve(__dirname));

// console.log(path.resolve(__dirname,'../day08/index.html'));

const path = require('path');
const fs = require('fs');
const fd = fs.openSync(path.resolve(__dirname, 'main.js'), 'a');
console.log(fd);
const result = fs.writeSync(fd, 'aaaaaa');
console.log(result);
fs.closeSync(fd);