const mongoose = require('mongoose');
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
const teacherModel = mongoose.model('teacher', teacherSchema);

//把创建集合暴露出去
module.exports = teacherModel;
