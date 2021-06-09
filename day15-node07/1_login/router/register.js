// 引入数据库集合
const userModel = require('../model/userModel');
//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');

const router = new express.Router();
// 注册
router.get('/register', async (req, res) => {
  const { username, password } = req.query;

  // 查找数据库中有没有用户
  const isUser = await userModel.findOne({ username });
  // 用户存在
  if (isUser) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户已存在',
    });
  }
  // 如果不存在，注册用户
  await userModel.create({
    username,
    password,
  });
  res.redirect('/login.html');
});

module.exports = router;
