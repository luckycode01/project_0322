const mongoose = require('mongoose');

// // 连接数据库
// mongoose.connect(
//   'mongodb://127.0.0.1:27017/student',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('数据链接成功');
//   }
// );

// mongoose.connect('mongodb://127.0.0.1:27017/student', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// //链接成功后会触发open事件
// mongoose.connection.once('open', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('数据库连接成功');
// });


mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
}, err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('数据库链接成功');
})