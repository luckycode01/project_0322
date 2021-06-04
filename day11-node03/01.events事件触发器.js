const eventEmitter = require('events');

//创建子类继承父类eventEmitter
class myEmitter extends eventEmitter {}

// 实例化
const emitter = new myEmitter();
//绑定事件
// 只会触发一次
emitter.once('myEvent', () => {
  console.log('你来了啊');
});

// emitter.on('myEvent', () => {
//   console.log('你来了啊');
// });

//触发事件
setTimeout(() => {
  emitter.emit('myEvent');
  emitter.emit('myEvent');
  emitter.emit('myEvent');
}, 1000);
