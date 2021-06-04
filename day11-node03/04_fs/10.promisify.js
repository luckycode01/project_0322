const fs = require('fs');
const path = require('path');

// const filePath = path.resolve(__dirname, "text.txt");
const filePath = path.resolve(__dirname, '01.同步写入1.js');

// 使用promisify
// const { promisify } = require('util');

// //promisify是把一个异步方法处理 返回一个函数，并且这个函数已经使用promise进行封装了，
// // 如果异步成功则返回成功的promise对象，否则返回失败的promise对象
// const readFile = promisify(fs.readFile);
// console.log(readFile);
// readFile(filePath)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// 使用promisify
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
readFile(filePath)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
