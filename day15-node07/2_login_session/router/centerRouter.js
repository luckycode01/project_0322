//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');

const router = new express.Router();

const userModel = require('../model/userModel');

const cookieParser = require('cookie-parser');
// 把cookies以对象呈现出来
router.use(cookieParser());

// 权限控制
router.get('/center.html', async (req, res, next) => {
  // 判断有没有携带sessionID
  if (!req.session.userID) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '请先登录',
    });
  }
});

router.get('/center.html', (req, res) => {
  const centerPath = path.resolve(__dirname, '../views/center.html');
  res.sendFile(centerPath);
});

module.exports = router;
