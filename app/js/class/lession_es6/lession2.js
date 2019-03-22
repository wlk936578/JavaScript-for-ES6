/**
 * 解构赋值
 *
 * 分类： 数组结构赋值 字符串结构  数值解构赋值
 *  		  对象解构赋值 布尔值解构赋值 函数参数解构赋值
 */

// 数组解构赋值

{
  let a, b, rest
  ;[a, b] = [1, 2]
  console.log(a, b)
}

{
  let a, b, rest
  ;[a, b, ...rest] = [1, 2, 3, 4, 5, 6]

  console.log(a, b, rest)
}

// 对象解构赋值

{
  let a, b
  ;({ a, b } = {
    a: 1,
    b: 2
  })
  console.log(a, b)
}

{
  let a, b, c, rest
  ;[a, b, c = 3] = [1, 2] // 如果结构赋值没有在解构上配对，则该值为undefined
  console.log(a, b, c)
}

// 变量交换(解构赋值法)不需中间值

{
  let a = 1,
    b = 2
  ;[a, b] = [b, a]
  console.log(a, b)
}

// 函数解构赋值

{
  function f() {
    return [1, 2]
  }
  let [a, b] = f()
  console.log(a, b)
}

// 数组结构赋值匹配模式，可选择性接受变量

{
  function f() {
    return [1, 2, 3, 4, 5]
  }
  let a, b, c
  ;[a, , , b] = f()
  console.log(a, b)
}

{
  function f() {
    return [1, 2, 3, 4, 5]
  }
  let a, b, c
  ;[a, ...b] = f()
  console.log(a, b)
}

// 对象解构赋值 根据key-value 来对应

{
  let o = {
    p: 42,
    q: true
  }
  let { p, q } = o
  console.log(p, q)
}

{
  let { a = 10, b = 5 } = {
    a: 3
  }
  console.log(a, b)
}

// 重命名 接口原始数据

{
  let metaData = {
    title: 'abc',
    test: [
      {
        title: 'test',
        desc: 'description'
      }
    ]
  }
  let {
    title: esTitle,
    test: [{ title: cnTitle }]
  } = metaData
  console.log(esTitle, cnTitle)
}
