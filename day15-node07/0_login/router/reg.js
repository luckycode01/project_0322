// 引入router模块
const express = require('express');
// path模块
const path = require('path');
// 创建router
const router = new express.Router();

const isRegFun = (req, res, next) => {
  const { username, password } = req.query;
  const userReg = /^[A-z0-9_]{1,20}$/;
  const passReg = /^[A-z0-9_]{1,20}$/;
  if (!userReg.test(username) || !passReg.test(password)) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码格式错误',
    });
  }
  next();
};

router.use('/login', isRegFun);
router.use('/register', isRegFun);
module.exports = router;
