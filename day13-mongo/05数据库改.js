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

//改
teacherModel
  .updateOne({ age: 100 }, { $set: { age: 18 } })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

teacherModel
  .updateMany({ age: 18 }, { $set: { sex: 'women' } })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
