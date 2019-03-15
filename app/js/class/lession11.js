/**
 * 数据结构
 * 1.Map 与 Array,Object 对比
 * 2.Set 与 Array,Object 对比
 * 数据要求高，复杂，优先Map,强调数据唯一性且复杂时优先Set
 *
 */

// 数据结构横向对比 增，删，查，改

// Map 和 Array
{
  let map = new Map()
  let array = []

  // 增
  map.set('t', 1)
  array.push({ t: 1 })
  console.info('map-array', map, array)

  //查
  let map_exist = map.has('t') // 若存在，返回布尔值
  let array_exist = array.find(item => item.t) // 若存在，返回当前对象
  console.info('map-array', map_exist, array_exist)

  //改
  map.set('t', 2)
  array.forEach(item => {
    item.t ? (item.t = 2) : ''
  })
  console.info('map-array-modify', map, array)

  //删
  map.delete('t')
  let index = array.findIndex(item => item.t)
  array.splice(index, 1)
  console.info('map-array-delete', map, array)
}

// Set 和 Array 对比
{
  let set = new Set()
  let array = []

  // 增
  set.add({ t: 1 })
  array.push({ t: 1 })
  console.info('set-array', set, array)

  // 查
  let set_exist = set.has({ t: 1 })
  let array_exist = array.find(item => item.t)
  console.info('set-array', set_exist, array_exist)

  // 改
  set.forEach(item => (item.t ? (item.t = 2) : '')) // 用add会直接新增，不会改变原有的值
  array.forEach(item => (item.t ? (item.t = 2) : ''))
  console.info('set-array-modify', set, array)

  // 删
  set.forEach(item => (item.t ? set.delete(item) : ''))
  let index = array.findIndex(item => item.t)
  array.splice(index, 1)
  console.info('map-array-delete', set, array)
}

// Map,Set 和 Object 对比
{
  let item = { t: 1 }
  let map = new Map()
  let set = new Set()
  let obj = {}

  // 增
  map.set('t', 1)
  set.add(item)
  obj['t'] = 1
  console.info('map-set-obj', map, set, obj)

  // 查
  console.info({
    map_exist: map.has('t'),
    set_exist: set.has(item),
    obj_exist: 't' in obj
  })

  // 改
  map.set('t', 2)
  item.t = 2 // 引用类型直接改变Set类型
  obj.t = 2
  console.info('map-set-obj-modify', map, set, obj)

  // 删
  map.delete('t')
  set.delete(item)
  delete obj['t']
  console.info('map-set-obj-delete', map, set, obj)
}
