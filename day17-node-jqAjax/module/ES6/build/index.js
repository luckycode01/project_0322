"use strict";

var _add = _interopRequireDefault(require("./add"));

var _sub = require("./sub");

var _person = require("./person");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 导入 默认暴露模块
// 统一暴露或分别暴露时，需要使用解构赋值导入
(0, _add["default"])(3, 2);
(0, _sub.sub)(4, 2);
console.log(_sub.str);
console.log(_person.name, _person.age);
(0, _person.eat)();