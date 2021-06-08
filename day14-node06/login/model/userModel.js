//引入模块
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, //唯一值
    required: true, //必填项
  },
  password: {
    type: String,
    required: true,
  },
});
// 创建一个集合
const userModel = mongoose.model('userInfo', userSchema);

module.exports = userModel;
