// 引入router模块
const express = require('express');
// path模块
const path = require('path');
//映入数据库集合
const userModel = require('../model/userModel');
// 创建router
const router = new express.Router();

router.get('/login', async (req, res, next) => {
  const { username, password } = req.query;
  // 查找用户在不在数据库
  const isUser = await userModel.findOne({ username });
  //如果用户不存在返回用户不存在
  if (!isUser) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户不存在',
    });
  }
  // 用户存在，判断密码正确与否
  if (isUser.password != password) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '密码错误',
    });
  }
  //登录成功
  // 设置session
  req.session.username = isUser._id;
  // 跳转页面
  const filePath = path.resolve(__dirname, '../views/center.html');
  res.sendFile(filePath);
});

module.exports = router;
