/**
 * call 和 apply
 * 定义，区别，以及应用
 *
 */
{
  function class1() {
    this.name = function() {
      console.log('我是class1内的方法');
    };
  }
  function class2() {
    class1.call(this);
    // 执行到此行代码后，调用call方法后，将class1的方法借给class2用
    // 也可以说class2继承了class1
  }
  let f = new class2();
  f.name(); // 输出 我是class1内的方法
}
