const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 绑定监听，当数据库连接成功后触发open
mongoose.connection.once('open', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('数据库连接成功');
});

// 创建Schema对象 为添加的数据创建约束
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, //表示值唯一
    required: true, //表示必须填写
  },
  sex: String,
  age: Number,
  hobby: [String],
});

//创建model对象并初始化，也可以不初始化
const teacherModel = new mongoose.model('teachers', teacherSchema);
//初始化
new teacherModel({
  name: '王老师',
  sex: 'men',
  age: '22',
  hobby: ['篮球'],
}).save((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('初始化完成');
});

//添加数据
teacherModel.create(
  {
    name: '陈老师',
    sex: 'men',
    age: '33',
    hobby: ['足球'],
  },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('添加完成');
  }
);

// 一次添加多条数据
teacherModel.create(
  [
    {
      name: '周老师',
      sex: 'men',
      age: '24',
      hobby: ['足球'],
    },
    {
      name: '钱老师',
      sex: 'men',
      age: '26',
      hobby: ['篮球'],
    },
    {
      name: '孙老师',
      sex: 'men',
      age: '16',
      hobby: ['足球'],
    },
  ],
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('添加完成');
  }
);
