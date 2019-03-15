## express -e . 输入后提示 command not found: express

先安装 全局安装 express 和 express-generator

然后输入 express -e .

## 执行 gulp 命令 提示 command not found: gulp

需全局安装 gulp

## 直接执行 gulp 命令 会优先查找 default.js,如果代码用 es6 编写 执行 gulp 时

## 会提示 Using gulpfile ~/Documents/demos/es6/gulpfile.babel.js

请先配置 gulpfile.babel.js

## Failed to load external module @babel/register;

降级 gulp 当前版本 到 3.9.0

## 上述条件达成后，调整 .babelrc 中的代码,并安装 babel-preset-es2015

{
'presets':['es2015']
}

## Cannot find module '@babel/core'

原因 "babel-loader": "^8.0.0" 版本问题。
使用 "babel-loader": "^7.1.5"即可解决该错误。

## webpack4 loaders 写法改变

rules:{
test:xxxx,
loader: 'babel-loader
}

## 快频彩种 彩票的一种 10 分钟一期

功能模块：（选好投注）
倒计时 玩法切换 计算金额
添加号码 投注支付 随机号码
奖金预测 状态更新 动态遗漏

涵盖 ES6 知识点
let 和 const 解构赋值 正则扩展 数值扩展
数组扩展 函数扩展 对象扩展 字符串扩展
Symbol 数据结构 Proxy Reflect
类 Promise Generator 模块化
