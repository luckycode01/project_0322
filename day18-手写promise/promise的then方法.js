// 封装自己的promise构造函数
function myPromise(exector) {
  // 保存当前实例化对象的this
  const _this = this;
  // 扩展属性status   value
  _this.status = 'pending';
  _this.value = undefined;
  // 扩展一个函数属性
  _this.callback = {};
  // 封装resolve 和reject函数 promise回调函数触发时传入
  function resolve(value) {
    if (_this.status !== 'pending') return;
    _this.status = 'resolved';
    _this.value = value;

    // 调用then中的onResolved方法 //保证该方法调用一直是异步，将其放在异步代码中
    // 保证onResolve在then执行之后执行
    setTimeout(() => {
      _this.callback.onResolved && _this.callback.onResolved(value);
    });
  }
  function reject(reason) {
    if (_this.status !== 'pending') return;
    _this.status = 'rejected';
    _this.value = reason;
    // 调用then中的onRejected方法 //保证该方法调用一直是异步，将其放在异步代码中
    // 保证onRejected在then执行之后执行
    setTimeout(() => {
      _this.callback.onRejected(reason);
    });
  }

  // 构造的时候调用exector函数
  exector(resolve, reject);
}

// then方法封装   调用then时是同步的，可以控制then中的函数异步调用
myPromise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // then返回的是一个promise对象
  return new myPromise((resolve, reject) => {
    // onResolved函数给实例化对象，在resolve后调用
    _this.callback.onResolved = function (value) {
      //callback调用时，执行onresolve then的返回值看回调函数的返回值
      // 如果onResolve执行错误，返回一个失败的promis对象
      try {
        const re = onResolved(value);
        // 判断onResolve返回的是不是promis对象，不是就直接返回成功的promis对象，值为re
        if (re instanceof myPromise) {
          // 如果re是promise对象，使用then监听  成功就调用resolve 失败就调用reject
          re.then(
            (data) => {
              resolve(data);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          resolve(re);
        }
      } catch (err) {
        reject(err);
      }
    };
    // onRejected 函数 在reject后调用
    _this.callback.onRejected = function (reason) {
      onRejected(reason);
    };
  });
};
