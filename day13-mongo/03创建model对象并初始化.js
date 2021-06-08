//引入模块
const mongoose = require('mongoose');

//连接数据库
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
  }
);

// 创建schema对象，为后面插入的数据添加约束
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, //表示值是唯一的
    required: true, //表示必须填写
  },
  sex: String,
  age: Number,
  hobby: [String],
});

//创建model对象  两个参数，集合名、约束
const studentModel = new mongoose.model('students', studentSchema);

//初始化集合
new studentModel({
  name: '小明',
  sex: 'men',
  age: 18,
  bobby: ['1', '2'],
}).save((err) => {
  if (err) {
    console.log(err);
    return;
  }
});
