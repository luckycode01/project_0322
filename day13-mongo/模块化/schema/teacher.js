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
