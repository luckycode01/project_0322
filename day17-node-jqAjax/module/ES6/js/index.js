// 导入 默认暴露模块
import add from './add';

// 统一暴露或分别暴露时，需要使用解构赋值导入

import { sub, str } from './sub';

import { name, age, eat } from './person';

add(3, 2);
sub(4, 2);
console.log(str);
console.log(name, age);
eat();
