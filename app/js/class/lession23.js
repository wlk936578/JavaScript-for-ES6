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

  // 注意:当Boo并不作为构造函数时，且直接调用Boo函数，则当前的指向会有所不同
  function Boo () {
    //   this.name = '隔壁老王' 此时的this指向window,故this.name会报错
    //   this.age = 26
    console.log('this指向 ===>',this) 
    // 此时的this 会指向window对象(本项目经过打包，this指向会有变化,赋值为undefined)
    // 但在一般浏览器环境下会指向window
}
  Boo()
}

// 情况2 
// 函数作为对象的一个属性时，并且被作为对象的一个方法被调用后 this指向该对象
{
  let obj = {
      x: 10,
      fn: function() {
          console.log('作为obj的属性时调用 ===>',this)
          console.log('作为obj的属性时调用 ===>',this.x)
      }
  }
  obj.fn()
}

// 注: 如果fn函数不作为该对象的属性被调用而是直接调用，如
{
    let obj = {
        x: 10,
        fn: function() {
            console.log('并没有作为obj属性被调用时===>',this) // window 对象
            // console.log('并没有作为obj属性被调用时===>',this.x) // undefined
        }
    }
    let fn1 = obj.fn
    fn1()

    // 结论: 当函数没有作为对象的属性调用,而是用新的变量赋值时，this 指向会变成 window 对象
}

// 情况3
// 当函数用 call 或 apply 调用时
{
  let obj = {
      x:10
  }
  let fn = function () {
      console.log('call 改变函数 指针后调用 ===>', this)
      console.log('call 改变函数 指针后调用 ===>', this.x)
  }
  fn.call(obj) // 将this 从fn函数上 转移到 obj对象
}

// 情况4
// 全局 & 调用普通函数
{
  // 全局情况下，this指向永远是 window 对象
  console.log(this === window)
  // 普通函数被调用时，也是指向 window 对象
  let x = 10
  let fn = function() {
      console.log('作为普通函数被调用 ===>', this)
    //   console.log('作为普通函数被调用 ===>', this.x)
  }
  fn()
}

{
  let obj = {
      x:10,
      fn: function() {
          function f () {
              // 指向 window 对象,即对象中的函数内部定义的函数的 this指向仍然指向 window
              console.log(this) 
            //   console.log(this.x)
          }
          f()
      }
  }
  obj.fn()
}