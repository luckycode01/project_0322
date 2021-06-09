// 引入router模块
const express = require('express');
// path模块
const path = require('path');
// 创建router
const router = new express.Router();

// 权限控制
router.use('/center.html', async (req, res, next) => {
  if (!req.session.username) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '权限不够，请登录',
    });
    res.clearCookie('username');
  }

  next();
});

//响应页面
router.get('/center.html', (req, res) => {
  const filePath = path.resolve(__dirname, '../views/center.html');
  res.sendFile(filePath);
});

module.exports = router;
