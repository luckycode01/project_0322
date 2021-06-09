// 引入router模块
const express = require('express');
// path模块
const path = require('path');
// 创建router
const router = new express.Router();

const isEmptyFun = (req, res, next) => {
  const { username, password } = req.query;
  if (!username || !password) {
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '用户名或密码不能为空',
    });
  }
  next();
};

router.use('/login', isEmptyFun);
router.use('/register', isEmptyFun);
module.exports = router;
