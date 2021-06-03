function add(...rest) {
  return rest.reduce((prev, item, index, rest) => {
    return prev + item;
  }, 0);
}

//导出方式1
//默认是一个对象，真正暴露的对象，就是module.exports 指向的对象是谁暴露的就是谁；
// module.exports.add = add;
// 方式2
// module.exports = {
//   add,
// };

// 方式3
// module.export 的一个引用，指向的是module.exports默认的对象
exports.add = add;
