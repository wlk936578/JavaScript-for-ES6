/**
 *  通用装饰器 mixin 混入各种方法
 *
 *
 *
 */

// 使用Object.assign 简单实现 mixin模式
{
  const Foo = {
    foo() {
      console.log('foo');
    }
  };
  class MyClass {}
  Object.assign(MyClass.prototype, Foo); // 使用Object.assign 让Foo对象 的 foo方法 混入 Myclass 类
  let obj = new MyClass();
  obj.foo();
}

{
  function mixins(...list) {
    return function(target) {
      Object.assign(target.prototype, ...list);
    };
  }
  const Foo = {
    foo() {
      console.log('foo'); // 使用装饰器来实现 mixin方法的混入
    }
  };
  @mixins(Foo)
  class MyClass {}
  let obj = new MyClass();
  obj.foo;
}

// 使用高阶组件的反向继承思想 实现多重继承
{
  let calMixin = BaseClass =>
    class extends BaseClass {
      constructor(...args) {
        super(...args);
        this.name = args[0];
        console.log('this is calMixin', ...args);
      }
      calc() {
        console.log('calMixin --> calc');
      }
    };

  let addStyleMixin = BaseClass =>
    class extends BaseClass {
      constructor(...args) {
        super(...args);
        this.age = args[1];
        console.log('this is addStyleMixin', ...args);
      }
      static show() {
        console.log('show color');
      }
      addStyle() {
        console.log('red color');
      }
    };

  const fixProto = mixins => {
    // 修正mixin的原型
    if (mixins.length <= 1) {
      return false;
    }
    mixins.forEach((item, index) => {
      if (index !== mixins.length - 1) {
        item.prototype = Object.create({});
      }
    });
    for (let i = 0; i < mixins.length - 1; i++) {
      Object.setPrototypeOf(mixins[i + 1].prototype, mixins[i].prototype);
    }
  };

  const compose = (...mixins) => child => {
    if (mixins.length === 0) {
      return child;
    }
    const last = mixins[mixins.length - 1];
    fixProto([...mixins, child]);
    return mixins.reduceRight((res, cur) => cur(res), last(child));
  };

  class Foo {
    constructor(...args) {
      console.log('this is Foo', args);
    }
    log() {
      console.log('log foo');
    }
    getName() {
      console.log(`myName is ${this.name}`);
    }
  }
  const MixinFoo = compose(
    calMixin,
    addStyleMixin
  )(Foo);
  class A extends MixinFoo {
    constructor(...args) {
      super(...args);
      this.birth = '1993';
    }
  }
  let obj = new A('张三', '27');
  console.log(obj);
  console.log(obj instanceof Foo); // true
  console.log(obj instanceof MixinFoo); // true
  console.log(obj instanceof calMixin); // false
  console.log(obj instanceof addStyleMixin); // false
  // 此处是因为箭头函数没有显示原型，所以mixin 和 mixin子类之前无法证明继承关系

  // 修正mixin的原型
  // calMixin.prototype = Object.create({}); //需要继承自Object，这里如果写null的话，instanceof Object会是false
  // addStyleMixin.prototype = Object.create({});
  // Object.setPrototypeOf(addStyleMixin.prototype, calMixin.prototype);
  // Object.setPrototypeOf(Foo.prototype, addStyleMixin.prototype);

  console.log('obj ===> MixinFoo', obj instanceof MixinFoo); //true
  console.log('obj ===> Foo', obj instanceof Foo); //true
  console.log('obj ===> calMixin', obj instanceof calMixin); //true
  console.log('obj ===> addStyleMixin', obj instanceof addStyleMixin); //true
  console.log('obj ===> Object', obj instanceof Object); //true
}
