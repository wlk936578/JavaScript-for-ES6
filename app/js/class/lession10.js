/**
 * 新增数据结构
 *  1.Set用法 2. WeakSet用法(Set弱类型)
 *  3.Map用法 4.WeakMap用法(Map弱类型)
 */

{
  let list = new Set() // 向Set类型中添加元素需要使用 add 方法
  list.add(5)
  list.add(7)

  console.log('size', list.size) // 长度用 size
}

// Set初始化时塞入默认值
{
  let arr = [1, 2, 3, 4, 5]
  let list = new Set(arr) // 转化为Set类型
  console.log('size', list.size)
}

// Set特性 不可重复 数据去重
{
  let list = new Set()
  list.add(1)
  list.add(2)
  list.add(1) // 不会生效
  console.log('list', list)
  let arr = [1, 2, 3, 1, '2']
  let list2 = new Set(arr) // 不会做数据类型的转换
  console.log('list2', list2)
}

// Set方法
{
  let arr = ['add', 'delete', 'clear', 'has']
  let list = new Set(arr)
  console.log('has', list.has('add'))
  console.log('delete', list.delete('add'), list)
  console.log('clear', list.clear(), list)
}

// Set遍历 仅返回value
{
  let arr = ['add', 'delete', 'clear', 'has']
  let list = new Set(arr)
  for (let key of list.keys()) {
    console.log('keys', key) // 返回value
  }
  for (let value of list.values()) {
    console.log('values', value) // 返回value
  }
  for (let value of list) {
    console.log('values', value) // 返回value
  }
  for (let [key, value] of list.entries()) {
    console.log('keys/values', key, value) // 返回value
  }
  list.forEach(item => {
    console.log(item) // 返回value
  })
}

// weakSet 与 Set 支持对象不同
// weakSet 弱引用 仅支持对象 仅是地址引用 没有垃圾回收机制,没有size属性,也没有 clear 方法，不能遍历
{
  let weakSet = new WeakSet()
  let arg = {}
  weakSet.add(arg)
  console.log('weakSet', weakSet)
  // weakSet.add(1) // 会报错
}

// Map 可用任何数据结构作为key值
{
  let map = new Map()
  let arr = ['123']
  // 添加元素用set(key,value)
  map.set(arr, 456)
  console.log('map', map, map.get(arr)) // 查询 key 值 用 get
}

// Map 第二种定义
{
  let map = new Map([['a', 123], ['b', 456]]) // 自动转换数组分割为2个key/value值
  console.log('map args', map)
}

// Map 方法 size,get,delete
{
  let map = new Map([['a', 123], ['b', 456]]) // 自动转换数组分割为2个key/value值
  console.log('size', map.size) // Map长度
  console.log('delete', map.delete('a'), map) // Map长度
  console.log('clear', map.clear(), map) // Map长度
}

// Map遍历 和 Set 同理

// WeakMap 接受对象仅为obj 没有size属性，不能遍历，没有clear方法
{
  let weakMap = new WeakMap()
  let o = {}
  weakMap.set(o, 123)
  console.log(weakMap.get(o))
}
