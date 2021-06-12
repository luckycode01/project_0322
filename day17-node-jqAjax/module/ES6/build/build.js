(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function add(a, b) {
  console.log(a + b);
} // 默认暴露


var _default = add;
exports["default"] = _default;
},{}],2:[function(require,module,exports){
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
},{"./add":1,"./person":3,"./sub":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eat = eat;
exports.age = exports.name = void 0;
// 分别暴露，需要暴露完整的定义
// 一般用于所有的都需要暴露
var name = 'laownag';
exports.name = name;
var age = 1999;
exports.age = age;

function eat() {
  console.log('干饭了');
}
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;
exports.str = void 0;

function sub(a, b) {
  console.log(a - b);
}

var str = 'hellow word'; // 统一暴露

exports.str = str;
},{}]},{},[2]);
