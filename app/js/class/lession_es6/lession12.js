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
  };

  // 映射obj对象 比 Object 的 get 和 set 方法更优雅
  let monitor = new Proxy(obj, {
    // 拦截对象的属性并进行读取
    get(target, key) {
      return target[key].replace('2017', '2018');
    },
    // 拦截对象并设置属性
    set(target, key, value) {
      if (key === 'name') {
        return (target[key] = value); // 使用 Reflect 的 set 方法更好
      } else {
        return target[key];
      }
    },
    // 拦截key in object 的操作
    has(target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return false;
      }
    },
    // 拦截并删除对象的操作
    deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        return true;
      } else {
        return target[key];
      }
    },
    // 拦截 Object.key, Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item != 'time');
    }
  });
  console.log('get', monitor.time);
  monitor.time = '2019';
  monitor.name = '慕课网';
  console.log('set', monitor.time);
  console.log('set', monitor.name);
  console.log('has', 'name' in monitor, 'time' in monitor);
  // delete monitor.time
  // delete monitor._r
  // console.log('delete', monitor.time)
  // console.log('delete', monitor)
  console.log('ownKeys', Object.keys(monitor));
}

// Reflect 用法和名称 与 Proxy 类似 操作对象尽量使用 Reflect
{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };
  console.log('Reflect get ===> ', Reflect.get(obj, 'time')); //直接取值
  Reflect.set(obj, 'name', 'mukewang');
  console.log(obj);
  console.log('has', Reflect.has(obj, 'name'));
}

// 校验数据类型 并解耦
{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key];
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy);
          } else {
            throw Error(`不能设置 ${key} 到 ${value} `);
          }
        } else {
          throw Error(`${key}不存在`);
        }
      }
    });
  }
  // 校验条件 配置项
  const personValidators = {
    name(val) {
      return typeof val === 'string';
    },
    age(val) {
      return typeof val === 'number' && val > 18;
    }
  };

  // 通过Proxy 代理 Person(非操作 person 实例对象) 使用 personValidators 校验 相关数据
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      return validator(this, personValidators);
    }
  }
  const person1 = new Person('李磊', 30);
  console.info(person1);
  // person1.name = 48
  person1.name = 'i am king';
  console.info(person1);
}

// 总结: Proxy 部分常用的地方
{
  // 拦截属性
  let obj = new Proxy(
    {
      f: 20
    },
    {
      get: function(target, props) {
        return 35;
      }
    }
  );
  console.log(`拦截属性 obj.f ===> return 35`, obj.f);
  console.log(`拦截属性 obj.c ===> return 35`, obj.c);
  console.log(`拦截属性 obj.d ===> return 35`, obj.d);
}

{
  // Proxy 作为其他对象的原型对象
  let proxy = new Proxy(
    {},
    {
      get: function(target, props) {
        return 33;
      }
    }
  );
  let obj = Object.create(proxy);
  console.log(obj.time);
  // 在obj上找不到 time 属性，所以会根据原型链向上查找，
  // 找到proxy实例对象后，就被proxy拦截，返回33
}

// 同一个拦截器函数，可以设置拦截多个操作。
{
  let handle = {
    get: function(target, name) {
      // 拦截获取fProxy的值
      if (name === 'prototype') {
        // 拦截 fProxy 访问到原型时
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
    apply: function(target, thisBinding, args) {
      // 拦截fProxy 作为 函数调用
      return args[0];
    },
    construct: function(target, args) {
      // 拦截fProxy 作为 构造函数调用
      return { value: args[1] };
    }
  };

  let fProxy = new Proxy(function(x, y) {
    return x + y;
  }, handle);

  console.log('fProxy', fProxy(1, 2));
  console.log('new fProxy', new fProxy(1, 2));
  console.log('fProxy.prototype', fProxy.foo === 'Hello, foo');
}

/**
 * Reflect 相关用法(更新)
 *
 *
 */

// get方法
{
  let myObj = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    }
  };
  console.log('Reflect get', Reflect.get(myObj, 'baz'));
  let receiverObj = {
    // 如果部署了 getter 读取函数 receiverObj，this将会指向 receiver
    foo: 45,
    bar: 20
  };
  console.log(
    'Reflect get receiverObj',
    Reflect.get(myObj, 'baz', receiverObj)
  );
  // 注意，get方法如果第一个参数不是对象，会报错
}

// set
{
  let myObj = {
    foo: 1,
    bar: 2,
    set baz(value) {
      return (this.bar = value + this.foo);
    }
  };
  Reflect.set(myObj, 'baz', 5);
  console.log('Reflect set', myObj.bar);
  let receiverObj = {
    // 如果部署了 setter 赋值函数 receiverObj，this将会指向 receiver
    foo: 20
  };
  Reflect.set(myObj, 'baz', 5, receiverObj);
  console.log('Reflect set receiverObj', myObj.bar);
  console.log('Reflect set receiverObj', receiverObj.bar);
}
