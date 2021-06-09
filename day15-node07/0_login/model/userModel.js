const mongoose = require('mongoose');

// 创建约束
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, //表式值唯一
    required:true,//表示必须填写
  },
  password: {
    type: String,
    required:true,
  }
});

// 创建集合
const userModel = mongoose.model('userInfo', userSchema);

module.exports = userModel;