/**
 * 闭包的概念和应用
 *
 *
 */

// 先了解 闭包的应用情况
// 1.函数作为返回值
{
  function fn() {
    let max = 10;
    return function bar(x) {
      if (x > max) {
        // 此处max为当前作用域之下的自由变量，需在创造 bar函数下的 fn函数中取值
        console.log('当前入参大于10', x);
      } else {
        console.log('当前入参小于10', x);
      }
    };
  }
  let fn1 = fn();
  fn1(9);
  // 如上代码，bar函数作为返回值，赋值给f1变量。
  // 执行f1(15)时，跨作用域 取值fn下的 max变量
}

// 2.当函数作为参数传递时
{
  let max = 10;
  let fn = function(x) {
    if (x > max) {
      console.log(x, max); // 此处max 为10
    }
  };
  (function(f) {
    let max = 100;
    // 此处函数f 下需要的max变量 是在 全局作用域下创建的fn函数中,
    // 即max取值为10，而非100
    f(15);
  })(fn);
  // 再次强调: 自由变量的取值要去创建这个函数的作用域(静态作用域)取值，而不是“父作用域”
}

// 闭包带来的问题
// 某些情况下，当函数调用完之后，执行的上下文环境不会直接销毁，而是保留在内存当中
{
  // 此为全局作用 此时max为 undefined
  function fn() {
    let max = 10; // 此时自由变量 max 为 10,将会区别于全局作用域下定义的max
    // 此为fn作用域
    return function bar(x) {
      if (x > max) {
        // 自由变量max
        console.log('x,max ===>', x, max);
      }
      // 此为bar作用域
    };
  }
  let f1 = fn(),
    max = 100; // 此时
  f1(15); // 即调用 bar(15)
  // 当函数f1 调用完毕后,由于返回的是一个函数，而函数的特别之处在于:
  // 它可以创建一块独立的作用域，而且，在此基础上,max为自由变量,此时它是引用自
  // fn的上下文环境的 max(此时max为10)变量，此时max无法被销毁，因为一旦销毁，
  // fn函数内部的 bar函数 就找不到 max变量了
  // 不能被销毁的fn函数 继续保留变量max，依然处于执行上下文的活动状态
  // 在执行定义了全局作用域下的max变量后，现在全局作用域max(100)和fn函数作用域下的max(10)
}
/**
 * 总结: 创建bar函数 是在执行fn()时创建的。
 * fn函数虽然早就执行结束了，但是fn()执行上下文环境(bar依赖的 max变量)
 * 还存在与栈中，
 * 因此bar(15)时，max可以查找到。如果fn()上下文环境销毁了，那么max就找不到了
 * 结论: 使用闭包会增加内存开销!
 *
 */

// 来个例子练习一下
{
  function createFunction() {
    var result = new Array();
    for (let i = 0; i < 10; i++) {
      result[i] = (function(m) {
        // 使用匿名函数 开辟独特的作用域形成 闭包环境
        return function() {
          return m; // 此处的m为自由变量，它会向上找到 createFunction 函数的变量i
        };
      })(i);
    }
    return result;
  }
  let fn = createFunction();
  for (let i = 0; i < 10; i++) {
    console.log('fn ===>', fn[i]());
  }
}
// 简化
{
  function fn() {
    let result = [];
    for (let i = 0; i < 10; i++) {
      result[i] = function() {
        return i; // 此处的自由变量i在fn函数的作用域上，fn函数不能被销毁，所以形成了闭包
      };
    }
    return result; // 返回一组函数
  }
  let fn1 = fn();
  for (let j = 0; j < 10; j++) {
    console.log('fn1 ===>', fn1[j]()); // 循环调用该函数
  }
}
