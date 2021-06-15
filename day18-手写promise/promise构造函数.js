// 封装自己的promise构造函数
function myPromise(exector) {
  // 保存当前实例化对象的this
  const _this = this;
  // 扩展属性status   value
  _this.status = 'pending';
  _this.value = undefined;
  // 封装resolve 和reject函数
  function resolve(value) {
    if (_this.status !== 'pending') return;
    _this.status = 'resolved';
    _this.value = value;
  }
  function reject(reason) {
    if (_this.status !== 'pending') return;
    _this.status = 'rejected';
    _this.value = reason;
  }

  // 构造的时候调用exector函数
  exector(resolve, reject);
}
