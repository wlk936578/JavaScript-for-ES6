/**
 * 函数扩展
 *  1.参数默认值 2.rest参数 3.扩展运算符
 *  4.箭头函数 5.this绑定 6.尾调用
 */

// 参数默认值
{
  function test(x, y = 'world', c) {
    // 前一个赋默认值后，接下的也要赋，不然会报错
    console.log('默认值', x, y)
  }
  test('hello')
  test('hello', 'kill')
}

// 作用域问题
{
  let x = 'test'
  function test2(x, y = x) {
    console.log('作用域', x, y)
  }
  function test3(c, y = x) {
    // (如果x不赋值，则 y 等于函数体外的 x )
    console.log('作用域', c, y)
  }
  test2('kill')
  test3('ko')
}

// rest参数 会将一系列参数先转为一个数组储存 类似 arguments
{
  function test3(...arg) {
    //...arg 参数之后不能有其他参数
    for (let v of arg) {
      console.log('rest', v)
    }
  }
  test3(1, 2, 3, 4, 'a')
}

// 扩展运算符 将数组转成离散的值
{
  console.log(...[1, 2, 4])
  console.log('a', ...[1, 2, 4])
}

// 箭头函数 1.函数名 2.函数参数 3.函数返回值(直接return)
// 根据作用域 判断箭头函数的调用时机
{
  let arrow = v => v * 2
  let arrow2 = () => 5
  console.log('arrow', arrow(3))
  console.log('arrow2', arrow2())
}

// 尾调用 判断函数最后一句话是不是函数(作用提升性能)
{
  function tail(x) {
    console.log('tail', x)
  }
  function fx(x) {
    return tail(x) // 尾调用
  }
  fx(123)
}
