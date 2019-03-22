/**
 * es6 继承相关
 *
 *
 */

// 继承通过 extends 关键字 来实现
{
  class Person {
    constructor(props) {
      this.name = props.name;
      this.age = props.age;
    }
  }
  class Student extends Person {
    constructor(props) {
      // console.log(this)  // 如果事先调用this，会报错，因为基于父类对象，只有super方法可以调用父类实例
      super(props);
      // super作用在于 父类的构造函数会先新建父类的this对象，
      // 等到父类完成塑造任务后，再得到父类同样的实例属性和方法
      // 这之后，子类可以加上自己的方法和实力属性，如果不调用super方法，那么就获取不了this对象了
      this.sex = '男';
      this.name = `我叫 ${props.name}`; // 覆盖原本的Person类的 name 属性
    }
  }
  let xiaoming = new Student({
    name: '小明',
    age: 26
  });
  console.log('xiaoming ===>', xiaoming);
}
/**
 * ES5 的继承，实质是先创造子类的实例对象this，
 * 然后再将父类的方法添加到this上面（Parent.apply(this)）。
 *
 *
 * ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，
 * 加到this(子类的this对象)上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
 * 注意: 如果子类没有定义constructor方法，这个方法会被默认添加
 * 即ES6会先新建父类this 对象，把方法和实例属性全部给到this父类对象后，再在此基础上添加子类的
 * 方法和属性，达到继承的效果
 */

// 例子
{
  class Point {}
  class ColorPoint extends Point {}
}

//等同于
{
  class Point {}
  class ColorPoint extends Point {
    constructor(...args) {
      super(...args);
    }
  }
}

// 父类的静态方法，也会被子类所继承
{
  class Person {
    static getFullYear() {
      return new Date().getFullYear();
    }
  }
  class Man extends Person {}
  console.log('static method', Man.getFullYear());
}

// 使用Object.getPrototypeOf 方法 用来从子类上获取父类
{
  // 可以判断一个类是否继承了另一个类
  class Point {}
  class ColorPoint extends Point {
    constructor(...args) {
      super(...args);
    }
  }
  console.log('extendBy ===>', Object.getPrototypeOf(ColorPoint));
  console.log('extendBy ===>', Object.getPrototypeOf(ColorPoint) === Point);
}

// super 关键字
// super 既可以当函数用，也可以当做对象来使用
{
  // 1.当super当做方法来使用时
  class A {}

  class B extends A {
    constructor() {
      super(); // 等价于 A.prototype.constructor.call(this)
      // 当super作为函数使用时，代表了父类的构造函数，
      // ES6 要求 子类的构造函数必须执行一次super函数
    }
  }
  // 注意: super虽然代表了 父类A的构造函数，但是它返回的是子类B的实例,
  // 即super内部的 this 指的是B的实例
  // 等价于 A.prototype.constructor.call(this)
}

// 进一步了解super的指向
{
  class A {
    constructor() {
      console.log(new.target.name);
    }
  }

  class B extends A {
    constructor() {
      super();
    }
  }
  new A();
  // new B();
}

// 2.当super作为对象时，在普通方法中，指向父类的原型对象
//   在静态方法中，指向父类
{
  class A {
    p() {
      return 2;
    }
  }
  class B extends A {
    constructor() {
      super();
      console.log(super.p());
      // 此处的super指向 的是A,prototype
      // 而super.p()即为super.prototype.p()
    }
  }
}
/**
 * 注意:  由于super指向的是父类的原型对象,那么定义在父类上的实例方法和属性
 * 是无法通过super调用的
 *
 */
{
  class A {
    constructor() {
      this.p = 2;
    }
  }
  A.prototype.age = 27; // 此处为父类A原型上的方法，可用super调用
  class B extends A {
    get m() {
      return super.p;
    }
    get age() {
      return super.age;
    }
  }
  let b = new B();
  console.log('父类实例上的属性 P', b.m); // 此处无法用super方法获取
  console.log('父类原型上的属性 P', b.age); // 此处无法用super方法获取
}
{
  // ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
  class A {
    constructor() {
      this.x = 1;
    }
    print() {
      console.log('super 调用 普通方法时，指向的是子类的实例', this.x);
    }
  }

  class B extends A {
    constructor() {
      super();
      this.x = 2; // 加上此行代码覆盖后，x 为 2
    }
    m() {
      super.print();
      // 此处的this指向为子类实例而不是父类实例
      // 即实际调用了 super.print.call(this)
    }
  }

  let b = new B();
  b.m(); // 2
}

{
  class A {
    constructor() {
      this.x = 1;
    }
  }
  class B extends A {
    constructor() {
      super();
      this.x = 2;
      super.x = 3;
      console.log(
        `构造器内部 调用super方法会 指向为子类实例，所以赋值就为子类实例的属性,
				而super指向的是父类原型，所以A.prototype.x 为 undefined`,
        super.x
      );
      console.log('this -> x', this.x); // 此时this.x 赋值为 3
    }
  }

  let b = new B();
}

// 使用super时，必须显示指定是作为函数还是对象来使用，否则会报错
{
  class A {}

  class B extends A {
    constructor() {
      super();
      // console.log(super) // 报错
    }
  }
}

{
  class A {}

  class B extends A {
    constructor() {
      super();
      console.log(super.valueOf() instanceof B); // true
      // super.valueOf()表明super是一个对象
    }
  }

  let b = new B();
}

// mixin(多重继承的实现)
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
{
  function mix(...mixins) {
    class Mix {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()); // 拷贝实例属性
        }
      }
    }

    for (let mixin of mixins) {
      copyProperties(Mix, mixin); // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
  }

  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  // mix 函数 可以将多个对象合称为一个，使用的时候，可以直接继承这个类
}
