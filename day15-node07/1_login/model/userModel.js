// 引入模块
const mongoose = require('mongoose');

// 创建yueshu
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, //表示值唯一
    required: true, //表示必填项
  },
  password: {
    type: String,
    required: true,
  },
});

// 创建集合
const userModel = mongoose.model('userInfo', userSchema);
// 导出集合
module.exports = userModel;
