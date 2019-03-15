/**
 * Proxy(代理) 和 Reflect(反射)
 *  1.概念
 *  2.使用场景
 */

{
  let obj = {
    // 创建供应商(原始对象)
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }

  // 映射obj对象 比 Object 的 get 和 set 方法更优雅
  let monitor = new Proxy(obj, {
    // 拦截对象的属性并进行读取
    get(target, key) {
      return target[key].replace('2017', '2018')
    },
    // 拦截对象并设置属性
    set(target, key, value) {
      if (key === 'name') {
        return (target[key] = value) // 使用 Reflect 的 set 方法更好
      } else {
        return target[key]
      }
    },
    // 拦截key in object 的操作
    has(target, key) {
      if (key === 'name') {
        return target[key]
      } else {
        return false
      }
    },
    // 拦截并删除对象的操作
    deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        return true
      } else {
        return target[key]
      }
    },
    // 拦截 Object.key, Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item != 'time')
    }
  })
  console.log('get', monitor.time)
  monitor.time = '2019'
  monitor.name = '慕课网'
  console.log('set', monitor.time)
  console.log('set', monitor.name)
  console.log('has', 'name' in monitor, 'time' in monitor)
  // delete monitor.time
  // delete monitor._r
  // console.log('delete', monitor.time)
  // console.log('delete', monitor)
  console.log('ownKeys', Object.keys(monitor))
}

// Reflect 用法和名称 与 Proxy 类似 操作对象尽量使用 Reflect
{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }
  console.log('Reflect get ===> ', Reflect.get(obj, 'time')) //直接取值
  Reflect.set(obj, 'name', 'mukewang')
  console.log(obj)
  console.log('has', Reflect.has(obj, 'name'))
}

// 校验数据类型 并解耦
{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key]
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error(`不能设置 ${key} 到 ${value} `)
          }
        } else {
          throw Error(`${key}不存在`)
        }
      }
    })
  }
  // 校验条件 配置项
  const personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  // 通过Proxy 代理 Person(非操作 person 实例对象) 使用 personValidators 校验 相关数据
  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
      return validator(this, personValidators)
    }
  }
  const person1 = new Person('李磊', 30)
  console.info(person1)
  // person1.name = 48
  person1.name = 'i am king'
  console.info(person1)
}
