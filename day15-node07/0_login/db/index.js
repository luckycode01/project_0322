const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/login', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// 绑定监听，当连接数据库触发
mongoose.connection.once('open', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('database connection successful');
});
