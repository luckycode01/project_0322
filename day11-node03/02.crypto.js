const crypto = require('crypto');

//明文
const str = '1234';

// 确定加密算法 md5 sha1 sha256 sha512
let md5 = crypto.createHash('md5');
let sha1 = crypto.createHash('sha1');
let sha256 = crypto.createHash('sha256');
let sha512 = crypto.createHash('sha512');

// 得到哈希对象
let createHash = md5.update(str, 'utf-8');
let createHash1 = sha1.update(str, 'utf-8');
let createHash2 = sha256.update(str, 'utf-8');
let createHash3 = sha512.update(str, 'utf-8');


// 获取密文
const secret = createHash.digest('hex');
const secret1 = createHash1.digest('hex');
const secret2 = createHash2.digest('hex');
const secret3 = createHash3.digest('hex');

let md = crypto.createHash('md5');
let createHash4 = md.update(secret, 'utf-8');
const secret4 = createHash4.digest('hex');
console.log(secret4);

console.log(secret);
console.log(secret1);
console.log(secret2);
console.log(secret3);


