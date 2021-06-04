const eventEmitter = require('events');

// 定义一个子类继承父类
class myEmitter extends eventEmitter { }
//实例化子类
const event = new myEmitter();

//绑定事件
event.on("myClick", () => {
  console.log('你来了啊');
})
// 触发事件
setTimeout(() => {
  event.emit('myClick');
}, 1000);