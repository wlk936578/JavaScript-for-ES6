/**
 * Decorator 修饰器(函数) 修改类的行为(扩展类的功能) (ES7)
 *  1.基本概念
 *  2.基本用法
 *
 */

// 定义一个函数 限制某个属性是只读的

{
  let readOnly = function(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
  }

  class Test {
    @readOnly
    time() {
      return '2017-03-11'
    }
  }
  let test = new Test()
  // console.log('time', test.time())
  // test.time = function() {
  //   console.log('reset time')
  // }
  console.log('time', test.time()) // 只读方法不可改变
}

// 修饰器可在 类 之外调用 (仅在声明class之前)
{
  let typename = function(target, name, descriptor) {
    target.myname = 'hello'
  }

  @typename // 对所有的 Test 实例进行 修饰
  class Test {}
  console.log('类修饰符', Test.myname)
}

// 修饰器第三方库 core-decorators

// 日志系统 埋点(Decorator方法) 抽离 埋点系统 成为可复用的模块
// 即使发送机制变化，仍可直接复用该修饰器
{
  let log = type => {
    return function(target, name, descriptor) {
      let src_method = descriptor.value
      descriptor.value = (...arg) => {
        src_method.apply(target, arg)
        console.info(`log ${type}`) // 设置埋点
      }
    }
  }

  class AD {
    // 业务逻辑 和 埋点隔离
    @log('show') // 与show 动作执行后，执行埋点
    show() {
      console.log('ad is show') // 业务逻辑
    }
    @log('click') // 与click 动作执行后，执行埋点
    click() {
      console.log('ad is click') // 业务逻辑
    }
  }

  let ad = new AD()
  ad.show()
  ad.click()
}
