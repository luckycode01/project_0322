// 引入router模块
const express = require('express');
// path模块
const path = require('path');
const userModel = require('../model/userModel');
// 创建router
const router = new express.Router();

router.get('/register', async (req, res, next) => {
  const { username, password } = req.query;
  // 查找用户在不在数据库
  const isUser = await userModel.findOne({ username });
  //如果用户存在
  if (isUser) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户已注册',
    });
  }
  // 创建用户
  const userCreat = await userModel.create({ username, password });
  console.log(userCreat);
  // 创建成功后重定向
  res.redirect('/login');
});

module.exports = router;
