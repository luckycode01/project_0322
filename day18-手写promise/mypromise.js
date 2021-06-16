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
    _this.value = reason;

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

  // 如果用户传入一个参数函数，需要处理
  onRejected =
    typeof onRejected !== 'function'
      ? function (reason) {
          throw reason;
        }
      : onRejected;

  // catch传入参数函数处理
  onResolved =
    typeof onResolved !== 'function'
      ? function (value) {
          return value;
        }
      : onResolved;
  // then返回的是一个对象
  return new myPromise((resolve, reject) => {
    // 给实例化对象添加两个方法，一个处理成功，一个处理失败，在onResolved 和onReject中调用
    // 当resolve和reject 中调用后，then的onResolved或者onReject开始执行并获取返回值，then的返回值取决于回调函数的返回值
    _this.callback.onResolved = function (value) {
      // 成功调用then时
      try {
        const re = onResolved(value);
        // 判断re是不是promis对象，如果不是直接返回成功
        if (re instanceof myPromise) {
          //如果是promis对象，判断是成功还是失败 使用then监听
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
        // 代码出错时直接返回错误
        reject(err);
      }
    };
    //处理失败调用then 同resolve
    _this.callback.onRejected = function (reason) {
      try {
        const re = onRejected(reason);
        if (re instanceof myPromise) {
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
        // 执行错误返回错误
        reject(err);
      }
    };
  });
};

// catch 方法
myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// finally方法
myPromise.prototype.finally = function (onResolved) {
  // finally的返回值主要是看调用finally的promise对象 （this）
  // this有两种状态，使用then监听
  return this.then(
    // 成功调用
    (value) => {
      // 不需要传参，finally不接收参数
      // 判断返回的是不是promise对象
      const re = onResolved();
      if (re instanceof myPromise) {
        // 如果re是成功对象 返回成功，失败则直接返回失败
        return re.then(() => {
          return value;
        });
      } else {
        return value;
      }
    },
    // 失败调用
    (reason) => {
      //返回的都是失败的promise对象
      const re = onResolved();
      if (re instanceof myPromise) {
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
myPromise.resolve = function (value) {
  // 返回的一定是一个promise对象
  return new myPromise((resolve, reject) => {
    // 判断传入的值是不是promise对象
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

// reject静态方法
myPromise.reject = function (reason) {
  // reason无论是什么值，最终都返回失败的promise
  return new myPromise((resolve, reject) => {
    reject(reason);
  });
};

// all静态方法
//传入参数是一个数组，数组中是promise对象，
// 当有一个是失败的时候就直接返回这个失败的promise，全为成功时返回一个成功的promise对象，值为数组，数组是由成功的promise对象的值组成
myPromise.all = function (promises) {
  return new myPromise((resolve, reject) => {
    // 定义一个空数组，接收成功promis对象的值
    const promiseArr = [];
    //获取promises的长度
    const promisesLen = promises.length;
    // 计数器
    let promiseCount = 0;
    // 对传入的promis对象数组遍历
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          promiseCount++;
          promiseArr[index] = value;
          if (promisesLen === promiseCount) {
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

// allSettled 静态方法
myPromise.allSettled = function (promises) {
  return new myPromise((resolve, reject) => {
    // 定义一个空数组，接收成功promis对象的值
    const promiseArr = [];
    //获取promises的长度
    const promisesLen = promises.length;
    // 计数器
    let promiseCount = 0;
    // 对传入的promis对象数组遍历
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          promiseCount++;
          promiseArr[index] = { status: 'resolved', value };
          if (promisesLen === promiseCount) {
            resolve(promiseArr);
          }
        },
        (reason) => {
          promiseCount++;
          promiseArr[index] = { status: 'rejected', reason };
          if (promisesLen === promiseCount) {
            resolve(promiseArr);
          }
        }
      );
    });
  });
};
