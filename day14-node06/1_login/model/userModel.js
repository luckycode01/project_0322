const mongoose = require('mongoose');

//创建约束
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, //表示值唯一
    required: true, //必填项
  },
  password: {
    type: String,
    required: true,
  },
});

//创建集合
const userModel = mongoose.model('userInfo', userSchema);
//导出
module.exports = userModel;
