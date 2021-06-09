//导入express模块
const express = require('express');
// 导入path模块
const path = require('path');

const router = new express.Router();

const regRouterFunc = (req, res, next) => {
  //查看用户输入内容 拿到用户名和密码
  const { username, password } = req.query;

  const userReg = /^[0-9a-zA-Z_]{0,20}$/;
  const passReg = /^[0-9a-zA-Z_]{0,10}$/;
  if (!userReg.test(username) || !passReg.test(password)) {
    //拼接err.ejs的路径
    const filePath = path.resolve(__dirname, '../views/err.ejs');
    return res.render(filePath, {
      errData: '账号和密码格式不对',
    });
  }

  next();
};
router.use('/login', regRouterFunc);
router.use('/register', regRouterFunc);

module.exports = router;
