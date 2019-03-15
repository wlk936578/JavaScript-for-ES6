/**
 * Generator
 *  1.基本概念
 *  2.next函数用法
 *  3.yield * 的语法
 */

// 异步编程 用法 Generator 包含多个步骤
// 若出现yield 或者 return 则不会继续执行，需要调用next函数

// 基本用法
{
  let tell = function*() {
    yield 'a'
    yield 'b'
    return 'c'
  }
  let k = tell()

  console.log(k.next())
  console.log(k.next())
  console.log(k.next())
  console.log(k.next()) // Generator(遍历器生成函数) 会返回一个 iterator接口
}

// Generator 和  iterator 的 关系
// 使用 Generator 作为遍历器的返回值
{
  let obj = {}
  obj[Symbol.iterator] = function*() {
    yield 1
    yield 2
    yield 3
  }
  for (let value of obj) {
    console.log('value', value)
  }
}

// 状态机用法 永远执行 a,b,c 三种状态
{
  let state = function*() {
    // 也可以换成async 和 await 的模式
    while (1) {
      yield 'A'
      yield 'B'
      yield 'C'
    }
  }
  let status = state()
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
  console.log(status.next())
}

// 实际运用 抽奖机制 好处：通过 Generator 将次数没有保留在全局变量中
{
  let draw = function(count) {
    // 与抽奖次数 隔离 解耦
    // 具体业务逻辑
    // 具体业务逻辑
    // 具体业务逻辑
    console.info(`剩余 ${count} 次`)
  }

  let residue = function*(count) {
    while (count > 0) {
      // 大于0 证明还能继续抽奖
      count-- // 限制次数
      yield draw(count) // 继续抽奖的逻辑
    }
  }

  let start = residue(5) // 初始化
  let btn = document.createElement('button')
  btn.id = 'start'
  btn.textContent = '抽奖'
  document.body.appendChild(btn)
  document.getElementById('start').addEventListener(
    'click',
    function() {
      start.next()
    },
    false
  )
}

// 长轮询 定时取 浏览器 状态(之前的做法，采用定时器) generator 做法(ajax 请求与 轮询方法 隔离)
{
  let ajax = function*() {
    yield new Promise((resolve, reject) => {
      // 等待Promise 返回 结果
      // 模拟请求
      setTimeout(() => {
        resolve({ code: 0 })
      }, 200)
    })
  }

  // 执行轮询
  let pull = function() {
    let generator = ajax() // generator 实例化
    let step = generator.next() // 执行 generator
    step.value.then(function(res) {
      if (res.code !== 0) {
        setTimeout(() => {
          console.log('wait', '查询中')
          return pull() // 函数尾调用
        }, 1000)
      } else {
        console.log(res)
      }
    }) // value为 Promise 实例 即 next方法 返回的 value 属性
  }
  pull()
}
