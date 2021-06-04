const crypto = require('crypto');

// 获取明文
const str = '123456'

//确定加密算法
const md5 = crypto.createHash('md5');
//获取加密哈希对象
const hash = md5.update(str, 'utf-8')
//获取密文
const secret = hash.digest('hex');

console.log(secret);

// 再次加密密文
console.log(crypto.createHash('md5').update(secret,'utf-8').digest('hex'));