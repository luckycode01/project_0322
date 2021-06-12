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