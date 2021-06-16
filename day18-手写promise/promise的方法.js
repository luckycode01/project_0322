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
      _this.callback.onRejected && _this.callback.onRejected(reason);
    });
  }

  // 构造的时候调用exector函数
  exector(resolve, reject);
}

// then方法封装   调用then时是同步的，可以控制then中的函数异步调用
myPromise.prototype.then = function (onResolved, onRejected) {
  const _this = this;

  // 当用户调用then时只输入一个参数，不传入第二个参数时
  onRejected =
    typeof onRejected !== 'function'
      ? function (reason) {
          throw reason;
        }
      : onRejected;
  // 如果成功时调用catch方法
  onResolved =
    typeof onResolved !== 'function'
      ? function (value) {
          return value;
        }
      : onResolved;

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
            (value) => {
              resolve(value);
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
      try {
        const re = onRejected(reason);
        // 判断onReject返回的是不是promise对象
        if (re instanceof myPromise) {
          // 是promise对象就使用then监听， 成功就调用resolve 失败调用reject
          re.then(
            (value) => {
              resolve(value);
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
  });
};

// catch方法
myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// finally方法
myPromise.prototype.finally = function (onResolved) {
  // finally的返回值主要看他的调用者  this是调用finall的promise对象
  // this有两种状态，成功和失败 使用then监听
  return this.then(
    (value) => {
      // finall不需要传参，
      // 当调用者是成功的对象时
      const re = onResolved();
      // 判断re是不是对象，不是对象直接返回
      if (re instanceof myPromise) {
        // then只写一个参数时 成功调用返回成功，失败调用则直接返回失败对象
        // 不需要传参
        return re.then(() => {
          return value;
        });
      } else {
        return value;
      }
    },
    (reason) => {
      // 失败调用finally
      const re = onResolved();
      if (re instanceof myPromise) {
        // 失败调用finally 不管re是成功还是失败finall最终返回失败
        return re.then(() => {
          throw reason;
        });
      } else {
        throw reason;
      }
    }
  );
};

// resolve静态方法
// resolve方法的参数，无论是一个成功的promise对象，是还是失败的对象  resolve返回的都是这个对象
myPromise.resolve = function (value) {
  // 返回的是promise对象
  return new myPromise((resolve, reject) => {
    // 判断value是否为对象
    if (value instanceof myPromise) {
      value.then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      resolve(value);
    }
  });
};
// reject静态方法 f
// 返回一个失败的promise对象
myPromise.reject = function (reason) {
  return new myPromise((resolve, reject) => {
    reject(reason);
  });
};

// all 静态方法
// 全部为成功返回成功，值为数组 ；    有一个为失败，返回失败 值为失败的值
myPromise.all = function (promises) {
  // 返回一个promise对象
  return new myPromise((resolve, reject) => {
    //获取传入参数数组的长度
    const promisesLen = promises.length;
    // 空数组，用来接收promis对象的值
    const promiseArr = [];
    // 定义一个计数器
    let promiseCount = 0;
    // 遍历promises
    promises.forEach((promise, index) => {
      // 使用then 监听promis对象的状态
      promise.then(
        (value) => {
          promiseCount++;
          promiseArr[index] = value;
          if (promiseCount === promisesLen) {
            resolve(promiseArr);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

// allSettle 静态方法 无论其中有失败，最终返回成功的值
// 返回一个数组，数组中存放的是描述每一个promis对象结果的对象 wulun
myPromise.allSettled = function (promises) {
  return new myPromise((resolve, reject) => {
    //获取传入参数数组的长度
    const promisesLen = promises.length;
    // 空数组，用来接收promis对象的值
    const promiseArr = [];
    // 定义一个计数器
    let promiseCount = 0;
    // 遍历promises
    promises.forEach((promise, index) => {
      // 使用then 监听promis对象的状态
      promise.then(
        (value) => {
          promiseCount++;
          promiseArr[index] = {
            status: 'resoveled',
            value,
          };
          if (promiseCount === promisesLen) {
            resolve(promiseArr);
          }
        },
        (reason) => {
          promiseCount++;
          promiseArr[index] = {
            status: 'reject',
            reason,
          };
          if (promiseCount === promisesLen) {
            resolve(promiseArr);
          }
        }
      );
    });
  });
};
