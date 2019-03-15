/**
 * Iterator 和 for...of 循环
 *  1.什么是Iterator接口
 *  2.Iterator的基本用
 *  3.for...of
 */

{
  let arr = ['hello', 'world']
  let map = arr[Symbol.iterator]() // 数组内部的接口
  console.log(map.next())
  console.log(map.next())
  console.log(map.next()) // done 属性判断 循环是否结束
}

// 自定义 iterator 接口 对接 object
{
  let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [Symbol.iterator]() {
      // 定义迭代器方法
      let self = this
      let index = 0
      let arr = self.start.concat(self.end)
      let len = arr.length
      return {
        next() {
          // 定义 next 方法
          if (index < len) {
            return {
              value: arr[index++],
              done: false
            }
          } else {
            return {
              value: arr[index++],
              done: true
            }
          }
        }
      }
    }
  }
  for (let key of obj) {
    console.log(key)
  }
  // 理想结果，先遍历 start 再遍历 end
}

// for...of 循环取 value 值 允许遍历 es6 新的数据结构 Maps（映射）, Sets（集合）
{
  let arr = ['hello', 'world']
  for (let value of arr) {
    console.log('value', value)
  }
}
