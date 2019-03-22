/**
 * let 和 const
 *
 */

// es6强制开启 use strict 严格模式
function test() {
  var a = 6
  for (let i = 1; i < 3; i++) {
    // let 声明的变量只在块级作用域下有效
    console.log(i) // 使用let变量不能重复声明
  }
  // console.log(i) // 输出 Uncaught ReferenceError 引用错误
}

function last() {
  const PI = 3.141592653 // 常量不能修改 const 也有块级作用域的效果，且必须声明时赋值
  const k = {
    a: 1
  }
  k.b = 3 // 当const 为 对象时，请注意对应的 指针不可修改，但是 对象本身可以修改
  console.log(PI, k) // 且声明时必须赋值
}

test()
last()
