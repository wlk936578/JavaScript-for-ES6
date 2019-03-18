/**
 * this的含义
 * 
 * 
 */

// this的取值，分为4种情况
// 重点:函数中的this是 在真正被调用时才确定的,函数定义时是无法确定的
// 原因在于 js 函数中的 this的取值 是上下文环境的一部分，而函数不断的调用,
// 会不断产生新的上下文 

// 情况1 构造函数
{
  // 如果在构造函数下new出来的对象，
  // 那么此时的this指向的是该构造函数下即将new出来的对象
  function Foo (name,age) {
    this.name = name
    this.age = age
    console.log(this)
  }
  let foo = new Foo('老王',26)
  console.log(foo.name)
  console.log(foo.age)
}