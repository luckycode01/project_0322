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
  // 当用户访问center.html 时判断是否携带服务端发送的cookie
  if (req.cookies.userID) {
    try {
      
      const re = await userModel.findOne({ _id: req.cookies.userID });
      if (re) {
        next();
      } else {
        const filePath = path.resolve(__dirname, '../views/err.ejs');
        return res.render(filePath, {
          errData: '请重新登录',
        });
      }
    } catch (err) {
      const filePath = path.resolve(__dirname, '../views/err.ejs');
      return res.render(filePath, {
        errData: '请重新登录',
      });
    }
  } else {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '请重新登录',
    });
  }
});

router.get('/center.html', (req, res) => {
  const centerPath = path.resolve(__dirname, '../views/center.html');
  res.sendFile(centerPath);
});

module.exports = router;
