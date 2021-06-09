// 引入数据库集合
const userModel = require('../model/userModel');
//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');

const router = new express.Router();
// 中间件 处理账号密码是否位空
router.get('/login', async (req, res) => {
  const { username, password } = req.query;

  // 查找数据库中有没有用户
  const isUser = await userModel.findOne({ username });
  if (!isUser) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户不存在',
    });
  }
  // 用户存在，判断密码是否正确
  if (isUser.password != password) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '密码错误',
    });
  }
  // 登录成功
  const filePath = path.resolve(__dirname, '../public/center.html');
  res.sendFile(filePath);
});

module.exports = router;
