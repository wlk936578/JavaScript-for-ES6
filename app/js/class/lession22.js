/**
 * 作用域相关
 *  执行上下文
 */


{
  console.log(a) // undefined
  console.log(b) // undefined
  console.log(c) // undefined
  let a
  let b
  let c = 10
  // 当浏览器在执行log语句时，已经做了准备工作，
  // 知道了a是 undefined，是因为其中包括了对变量的声明,而不是声明并复制
}

// 准备工作2
{
  console.log(this)
  // 与第一种情况不同的是：第一种情况只是对变量进行声明（并没有赋值），
  // 而此种情况直接给this赋值。这也是“准备工作”情况要做的事情之一
}

// 准备工作3 函数声明 和 函数表达式
{
  console.log(foo) // function foo (){}
  function foo () {}  // 函数声明
  console.log(boo) // undefined
  let boo = function () {} // 函数表达式，仅声明，赋值默认为undefined
}

/**
 * 总结: 浏览器的准备工作 -- 执行上下文环境
 *  1. 变量声明 默认赋值为 undefined
 *  2. this -- 赋值
 *  3. 函数声明 -- 赋值
 * 
 *  ps: javascript在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。
 *  这三种情况分别对应:1.全局代码,2.函数体,3.eval代码
 *  1. 写在script中的 全局代码
 *  2. eval代码块会接受文本形式的代码并执行，如
 *     eval('alert(123)')
 *  3. 函数体是代码段是因为函数在创建时，本质上是 new Function(…) 得来的，
 *    其中需要传入一个文本形式的参数作为函数体，如
 *    function foo (x) {
 *      console.log(x+123)
 *    }
 *    等价于
 *    let foo = new Function ('x','console.log(x+123)') 
 *   ps2: 相对于函数表达式来说,函数声明效率更高
 */


// 除上述三种数据会提前准备外,如果在函数中，还会其他数据
// arguments变量和函数的参数 在函数调用前(重点) 都已经被赋值
// 函数每调用一次，将会产生新的执行上下文环境，这是因为每次调用参数可能不同
{
  function foo (x) {
      console.log('arguments 数组和参数 x 已经被赋值 ===>',arguments) // [10]
      console.log(x)         // 10
  }
  foo(10)
}

// 函数在定义时，已经确定了函数体内部的 自由变量 的作用域，如
{
  let a = 10
  function fn() {
    console.log('此时a已经被定义 ===>',a)  // a 为自由变量，函数创建时已经确定了a取值的作用域
  }
  function bn(fuc) {
    let a = 20 // 由于a已经被赋值且确定了作用域，故重新定义并没有对自由变量 a 起效
    fuc()
    console.log('bn下重新定义的 a ===>',a) 
    // 此时的a 为 bn函数体下的 变量,作用域在bn 内部,与自由变量a的取值作用域 有本质区别
  }
  bn(fn)
}

/**
 * 进一步总结:
 * 全局代码上下文环境 的 准备工作为:
 *  1.普通变量，如let a = 10 (仅声明，默认值为undefined)
 *  2.函数声明,如fn(){} (赋值)
 *  3.this,赋值
 * 函数体内部:
 *  1.arguments(赋值)
 *  2.函数体参数(赋值)
 *  3.函数内部的自由变量的取值作用域 (赋值)
 */
