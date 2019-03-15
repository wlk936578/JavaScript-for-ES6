/**
 * Promise
 *  1.什么是异步
 *  2.Promise的作用
 *  3.Promise的基本用法
 *
 */

// es5 回调
{
  let ajax = function(callback) {
    console.log('执行1')
    setTimeout(() => {
      callback && callback.call()
    }, 1000)
  }
  ajax(function() {
    console.log('timeout1')
  })
}

// promise 和 es5回调 对比
{
  let ajax = function() {
    console.log('执行2')
    return new Promise((resolve, reject) => {
      // resolve 执行下一步操作 reject 中止操作
      setTimeout(function() {
        resolve()
      }, 1000)
    })
  }

  ajax().then(function() {
    console.log('Promise', 'timeout2')
  })
}

// 使用Promise 解决多重回调 规则，可不断返回新的Promise对象，并用then方法继续执行接下来的操作
{
  let ajax = function() {
    console.log('执行3-1')
    return new Promise((resolve, reject) => {
      // resolve 执行下一步操作 reject 中止操作
      setTimeout(function() {
        resolve()
      }, 1000)
    })
  }

  ajax()
    .then(function() {
      console.log('执行3-2')
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve()
        }, 2000)
      })
    })
    .then(function() {
      console.log('执行3-3', 'timeout3')
    })
}

// Promise 串行 catch捕获异常
{
  let ajax = function(num) {
    console.log('执行4')
    return new Promise((resolve, reject) => {
      if (num > 5) {
        resolve()
      } else {
        throw new Error('出错了')
      }
    })
  }
  ajax(6)
    .then(function() {
      console.log('log', 6)
    })
    .catch(function(err) {
      console.log('catch', err)
    })
}

// Promise.all 处理feed流 多张图片全部加载完毕再加载页面
{
  // 异步加载图片
  function loadImg(src) {
    //本身为 Promise 实例
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img) // 接受 img 对象,并在then的回调中 返回该参数
      }
      img.onerror = function(err) {
        reject(err)
      }
    })
  }

  function showImgs(imgs) {
    imgs.forEach(img => {
      document.body.appendChild(img)
    })
  }

  // all方法 应用 将多个promise实例合并成一个新的Promise实例(数组)，
  // 当数组中所有的promise实例发生改变时，这个新的promise实例才会发生变化
  Promise.all([
    loadImg(
      'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=961786835,1865910189&fm=58'
    ),
    loadImg(
      'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=456475623,772966793&fm=58'
    ),
    loadImg(
      'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3649780630,992036615&fm=58'
    )
  ]).then(showImgs)
}

// race方法 不关心加载速度，只看哪个加载最快,只响应加载最快的，其他的不管
{
  function loadImg(src) {
    //本身为 Promise 实例
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err) {
        reject(err)
      }
    })
  }

  function showImgs(img) {
    let p = document.createElement('p')
    p.appendChild(img)
    document.body.appendChild(p)
  }

  Promise.race([
    loadImg(
      'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=961786835,1865910189&fm=58'
    ),
    loadImg(
      'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=456475623,772966793&fm=58'
    ),
    loadImg(
      'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3649780630,992036615&fm=58'
    )
  ]).then(showImgs)
}
