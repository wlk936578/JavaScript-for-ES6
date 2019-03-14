/**
 * Symbol Symbol概念 Symbol作用
 * 生成独一无二的值
 */

{
  // 声明
  let a1 = Symbol()
  let a2 = Symbol()
  console.log('Symbol', a1 === a2) // false

  // 第二种声明 检查key值,如果注册过，返回注册过的值，如果没注册过，重新生成新值
  let a3 = Symbol.for('a3')
  let a4 = Symbol.for('a3')
  console.log('Symbol', a3 === a4) // a4拿到a3的值，两者相等
}

// 使用场景 可定义独一无二的变量参数，即时后续添加同样的key值，也不会冲突和被覆盖
{
  let a1 = Symbol.for('abc')
  let obj = {
    [a1]: '123',
    abc: '345',
    c: '456'
  }
  console.log('obj', obj)

  // 通过for in 或者 let of 无法 拿到 Symbol 定义的值
  for (let [key, value] of Object.entries(obj)) {
    console.log('let of', key, value) // Symbol定义的 key/value 拿不到
  }
  // Object.getOwnPropertySymbols 可以取到Symbol定义的key值
  Object.getOwnPropertySymbols(obj).forEach((item, index) => {
    // 该方法会返回一个数组储存key值
    console.log('getOwnPropertySymbols', obj[item])
  })
  // Reflect.ownKeys() 可以取到全部的key/value值,用法同上
  Reflect.ownKeys(obj).forEach(item => {
    console.log('ownKeys', item, obj[item])
  })
}
