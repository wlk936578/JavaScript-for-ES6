/**
 * es5 原型继承和多重继承
 *
 *
 */

// 复习一下原型链
{
  // 构造函数的对象的原型链
  function Foo(name) {
    this.name = name;
  }
  Foo.prototype.age = 18; // 定义原型上的属性
  let foo = new Foo('小王');
  console.log('Foo --> foo.name', foo.name);
  console.log('Foo --> foo.age', foo.age);
  console.log('foo -> Foo', foo.__proto__ === Foo.prototype);
  console.log('Foo->Function', Foo.__proto__ === Function.prototype);
  console.log('Object-> Function', Object.__proto__ === Function.prototype);
  console.log(
    'Function.__proto__ -> Function.prototype',
    Function.__proto__ === Function.prototype
  );
  console.log(
    'Function.prototype.__proto__ -> Object.Prototype',
    Function.prototype.__proto__ === Object.prototype
  );
  console.log(
    'Object.prototype.__proto__ -> null',
    Object.prototype.__proto__ === null
  );
}

// 原型继承是创建新类型对象-子类型,而子类型基于父类型,子类型将拥有父类型所有的
// 属性和方法(从父类型继承而来)
// 继承方式: 定义 inherit方法和 method方法
{
  function Student(props) {
    this.name = props.name || 'unNamed';
  }
  Student.prototype.hello = function() {
    console.log(`hello ${this.name} !`);
  };
  function PrimaryStudent(props) {
    Student.call(this, props);
    // 此处是调用了Student的构造函数
    // 并将this指向了当前 PrimaryStudent 构造函数
    this.grade = props.grade || 1;
  }
  // 但是，调用了 Student的构造函数并等于继承了 Student,因为
  // PrimaryStudent 的原型链应该还是 PrimaryStudent.__proto__ -> Function.prototype -> Object.prototype
  console.log(
    'PrimaryStudent -> Function ',
    PrimaryStudent.__proto__ === Function.prototype
  );
}

// 进一步解决问题，达到真正的原型继承
{
  function Student(props) {
    this.name = props.name || 'unNamed';
  }
  function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade;
  }
  function F() {} // 创造空函数
  F.prototype = Student.prototype; // 将Student构造函数的原型 赋予 F.prototype
  // PrimaryStudent.prototype = new Student(); // 错误演示，如果不用空函数 F 取得Student的原型，那么一旦PrimaryStudent的原型上添加方法，那么Student的原型上也会有
  PrimaryStudent.prototype = new F(); // 将PrimaryStudent.prototype的原型指向 一个 新的F对象，该对象的原型链正好又是指向的Student的原型
  PrimaryStudent.prototype.constructor = PrimaryStudent; // 此时的PrimaryStudent原型的构造函数指向了 Student构造函数,所以必须再修复构造函数的指向
  PrimaryStudent.prototype.getGrade = function() {
    //此时PrimaryStudent 完全继承了Student的方法和属性还有原型链指向
    return this.grade;
  };
  let xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 90
  });
  let grade = xiaoming.getGrade();
  console.log('PrimaryStudent xiaoming grade ===>', grade);
  let xiaowang = new Student({ name: '小王' });
  console.log('Student xiaowang ===>', xiaowang);
  /**
   * 以上过桥函数F的作用主要是为了 清空 Student上 原本的所有方法(不包括原型)
   * 这种构造函数在new 出对象后，它的原型指向和Student一致，所以可以将PrimaryStudent 的 原型指向F对象
   * 最后修复PrimaryStudent的构造函数的指向，达到继承其原型，又不会污染原本Student的构造函数
   *
   */
}
// 进一步优化
{
  function inherits(child, parent) {
    let F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F(); // 相当于child的原型方法指向了 F构造出来的 对象(即指向了F对象的原型链)，并清空了父类的构造函数
    // 如果直接PrimaryStudent.prototype = new Student(),
    // PrimaryStudent 的原型上就会包含一些不必要的原Student构造函数上的属性
    child.prototype.constructor = child;
  }
  function Person(props) {
    this.name = props.name;
    this.birth = props.birth;
  }
  Person.prototype.getAge = function() {
    let year = new Date().getFullYear();
    return year - this.birth;
  };
  function Man(props) {
    Person.call(this, props);
    // 由于用过桥函数F 之前清空了Person的构造函数上所有的属性
    // 此时再次使用call方法 调用Person构造函数 来拿到Person的属性
    this.sex = '男';
  }
  inherits(Man, Person);
  Man.prototype.getMarried = function() {
    console.log('has already marry');
  };
  let people = new Person({
    name: '老王',
    birth: 1962
  });
  let jack = new Man({
    name: '杰克',
    birth: 1993
  });
  console.log('Person ===>', people);
  console.log('Person ===>', people.name);
  console.log('Person getAge ===>', people.getAge());
  console.log('Man ===>', jack);
  console.log('Man getAge ===>', jack.name);
  console.log('Man birth ===>', jack.birth);
  console.log('Man getAge ===>', jack.getAge());
  console.log('Man sex ===>', jack.sex);
  jack.getMarried();
}

{
  let xiaoming = {
    name: '小明',
    birth: 1990,
    age: function() {
      let that = this;
      function getAgeFromBirth() {
        let y = new Date().getFullYear();
        return y - that.birth;
      }
      return getAgeFromBirth();
    }
  };
  let xiaoming2 = {
    name: '小明2',
    birth: 1991,
    age: function() {
      let y = new Date().getFullYear();
      return y - this.birth;
    }
  };
  console.log('xiaoming ===>', xiaoming.age());
  let fn = xiaoming2.age;
  console.log('xiaoming2 ===>', xiaoming2.age());
  // console.log('xiaoming2 fn ===>', fn()); // this指向转变,会报错 undefined

  // 如上代码，如果fn函数被赋值到了另一个变量中，并没有作为obj的一个属性被调用，
  // 那么 this 的值就是window,this.x为 undefined。
  console.log('xiaoming2 fn apply ===>', fn.apply(xiaoming2, []));
  console.log('xiaoming2 fn call ===>', fn.call(xiaoming2));
  // 此时可用apply 方法 将 this重新指向 xiaoming2 对象上，也就是改变指针指向
}

// 巧用 apply 统计函数调用次数
{
  let count = 0;
  let oldParseInt = parseInt; // 保留原有函数parseInt
  window.parseInt = function() {
    // 重新定义 parseInt函数
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用一般函数，this指向 null 即可
  };
  console.log(window.parseInt(10.1));
  console.log(window.parseInt(15.1));
  console.log(window.parseInt(20.1));
  console.log(window.parseInt(25.1));
  console.log('count ===> parseInt', count);
}
