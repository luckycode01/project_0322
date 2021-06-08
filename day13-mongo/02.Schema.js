const mongoose = require('mongoose');

// 连接数据库
mongoose.connect(
  'mongodb://127.0.0.1:27017/student',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('数据库链接成功');
  }
);

//创建schema 对集合约束
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //必填项
    unique: true, //唯一值
  },
  sex: String,
  age: Number,
  // hobby:[] //限制值必须是一个数组
  hobby: [String], //限制值必须是一个数组，数组的值必须是字符串
  createTime: {
    type: Date,
    default: Date.now,
  },
});
