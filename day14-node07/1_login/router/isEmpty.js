//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');

const router = new express.Router();
// 中间件 处理账号密码是否位空
router.use((req, res, next) => {
  const { username, password } = req.query;
  if (!username || !password) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码不能为空',
    });
  }
  next();
});

module.exports = router;
