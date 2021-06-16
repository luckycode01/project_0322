// 分装自己的promise
function myPromise(exector) {
  // 保存当前实例化对象的this
  const _this = this;
  //扩展两个属性，status状态属性和value属性并设置默认值
  _this.status = 'padding';
  _this.value = 'undefined';
  // 用来存放方法
  _this.callback = {};

  // 封装resolve函数和reject函数
  function resolve(value) {
    if (_this.status !== 'padding') return;
    _this.status = 'resolved';
    _this.value = value;

    // then中的onResolved函数执行永远是异步的，需要将调用包裹在异步代码中
    setTimeout(() => {
      // 不是每一次resolve都会执行then  所以不是每一次都会有onResolved函数,
      // 如果有就执行，没有就不执行
      _this.callback.onResolved && _this.callback.onResolved(value);
    });
  }
  function reject(reason) {
    if (_this.status !== 'padding') return;
    _this.status = 'reject';
    _this.value = 'reason';

    setTimeout(() => {
      _this.callback.onRejected && _this.callback.onRejected(reason);
    });
  }

  // 实例化mypromise时就会调用
  exector(resolve, reject);
}

//then方法   then调用是同步的，让里面的代码异步执行
/**
 * // 在promis原型上添加then方法
 * @param {*} onResolved 用户传入的参数函数，成功时调用
 * @param {*} onRejected 失败时调用
 */
myPromise.prototype.then = function (onResolved, onRejected) {
  // 保存this
  const _this = this;
  // then返回的是一个对象
  return new myPromise((resolve, reject) => {
    // 给实例化对象添加两个方法，一个处理成功，一个处理失败，在onResolved 和onReject中调用
    // 当resolve和reject 中调用后，then的onResolved或者onReject开始执行并获取返回值，then的返回值取决于回调函数的返回值
    _this.callback.onResolved = function (value) {};
    _this.callback.onResolved = function (reason) {};
  });
};
