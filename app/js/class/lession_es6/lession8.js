/**
 * 对象扩展
 *  1.简洁表示法 2.属性表达式
 *  3.扩展运算符 4.object新方法
 */

// 简洁表示法
{
  let o = 1
  let k = 2
  let es5 = {
    o: o,
    k: k
  }
  let es6 = {
    o,
    k
  }
  console.log('es5', es5)
  console.log('es6', es6)

  // 如果对象里有方法
  let es5_methods = {
    hello: function() {
      console.log('hello')
    }
  }
  let es6_methods = {
    hello() {
      console.log('hello')
    }
  }
  console.log('es5', es5_methods.hello())
  console.log('es6', es6_methods.hello())
}

// 属性表达式
{
  let a = 'b'
  let es5_obj = {
    a: 'c', //key值需固定
    b: 'd'
  }

  let es6_obj = {
    [a]: 'c' // key值可为引用变量
  }
  console.log('es5', es5_obj)
  console.log('es6', es6_obj)
}

// 新增api
{
  // is方法
  console.log('字符串', Object.is('abc', 'abc')) // 功能与 === 类似
  console.log('数组', Object.is([], []), [] === [])

  // assign方法
  console.log('拷贝', Object.assign({ a: 'a' }, { b: 'b' })) // 浅拷贝 不能拷贝不可枚举的类型

  // entries 遍历key-value值
  let test = { k: 123, o: 456 }
  for (let [key, value] of Object.entries(test)) {
    console.log('key/value', key, value)
  }
}

// 扩展运算符(babel支持不够好)
{
  // let { a, b, ...c } = { a: 'test', b: 'kill', c: 'ddd', d: 'ccc' }
  // console.log(a, b)
}
