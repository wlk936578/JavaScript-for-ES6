/**
 *  数组新特性
 *  1.Array.from 2.Array.of 3.copyWithin
 *  4.find\findIndex 5.fill 6.entries\keys\values
 *  6.includes
 */

// of 生成数组
{
  let arr = Array.of(3, 4, 7, 9, 11)
  console.log('arr=', arr)
  let empty = Array.of()
  console.log('empty', empty)
}

// Array.from 遍历数组 将集合(包括dom元素)或数组转换成真正的数组 从而可以使用数组方法
{
  let p = document.querySelectorAll('p')
  let pArr = Array.from(p)
  pArr.forEach(function(item) {
    console.log(item.textContent)
  })

  console.log(
    Array.from([1, 3, 5], function(item) {
      // 兼具map映射功能
      return item * 2
    })
  )
}

// fill 填充数组 如把数组所有的值换成一个值

{
  console.log('fill-7', [1, 'a', undefined].fill(7))
  console.log('fill,pos', ['a', 'b', 'c'].fill(7, 1, 3)) // 后两个参数表示起始和截止未知
}

// keys 返回下标 values 返回值 es7 提案

{
  for (let index of ['1', 'c', 'ks'].keys()) {
    console.log('keys', index)
  }
  for (let value of ['1', 'c', 'ks'].values()) {
    console.log('value', value)
  }
  for (let [index, value] of ['1', 'c', 'ks'].entries()) {
    console.log('key/value', index, value)
  }
}

// 复制当前位置的数据
{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)) // 第三个参数为终止位
}

// 查找
{
  console.log(
    [1, 2, 3, 4, 5, 6].find(function(item) {
      // find 查找仅找个第一个匹配的数组成员
      return item > 3
    })
  )
  console.log(
    [1, 2, 3, 4, 5, 6].findIndex(function(item) {
      // find 查找仅找个第一个匹配的下标
      return item > 3
    })
  )
}

// 查找(更简单，且检测NaN) 检测是否匹配 返回 true 或 false
{
  console.log('number', [1, 2, NaN].includes(1))
}
