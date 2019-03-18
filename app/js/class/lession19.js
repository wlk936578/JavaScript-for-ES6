function foo () {}

Object.defineProperty(foo.prototype,'z',{
    get:function(){
        return 1
    }
})

var obj = new foo()

console.log('obj.z ===>',obj.z )
// obj.z = 10
// console.log('obj.z ===>',obj.z ) // 不可配置

Object.defineProperty(obj,'z',{value:100,configurable: true})

console.log('obj.z ===>',obj.z )

delete obj.z  // 删除掉配置后的z，会返回调用 get 方法时的z

console.log(obj.z)


// 每一个函数均有 prototype --即是原型链
// 函数的默认属性 --prototype
// 而prototype 的属性值同样是一个对象，默认的只有一个叫做constructor的属性，指向函数本身
{
    function Fn(){
        Fn.prototype.name = '王福朋'
        Fn.prototype.getYear = function () {
            return new Date().getTime()
        }
    }
    let fn = new Fn()
    console.log(fn.getYear())
}

// prototype 可以被覆盖
{
    function Fn(){

    }
    Fn.prototype = {
        constructor: Fn,
        name: '王福朋',
        getYear: function() {
            return new Date().getDate()
        }
    }
    let fn = new Fn()
    console.log(fn.name)
}

// 隐式原型 __proto__
// 每个对象都有一个__proto__属性，指向创建该对象的函数的prototype
// 注意！函数有prototype 而 对象 有__proto__ 千万别搞混
// new出来的对象之所以可以使用原来的 function 函数定义的prototype 属性上的 方法 是因为该对象有一条隐式原型引用了该函数的prototype
// Object.prototype 指向的是 null,虽然自定义函数的prototype本质和var obj={} 一样
{
    let obj = {}
    console.log(obj.__proto__ === Object.prototype)
}

// Function 同样也有 __proto__(因为它们也是被创建出来的)
// 两种方式 一种为平时常用的函数创建，另一种则是new的形式创建
{
  function fn (x, y) {
      return x + y
  }

  console.log(fn(10,20))
  let fn1 = new Function('x','y','return x + y') 
  console.log(fn1(20,30))

  // 自定义函数 Foo.__proto__ 指向 Function.prototype
  // Object.__proto__指向Function.prototype
  // Function.__proto__指向Function.prototype // 三者循环，形成环式结构
  // Function.prototype 指向的对象也是一个普通的被Object创建的对象，即它的 __proto__也是指向Object.prototype
}

// 引用类型 使用instanceof 可判断 到底是对象还是数组等等
// instanceof 参数为 第一个变量是一个对象，暂时称为A
// 第二个变量一般是一个函数，暂时称为B
// 判断规则:A的__proto__找引用对象,B的 prototype 也找，如果
// 两条线能找到同一引用对象，那么返回true
// 如果找到终点，仍不能重合，即返回false
{
    function Foo() {}
    let f1 = new Foo()
    console.log(f1 instanceof Foo) // 引用自 Foo 函数
    console.log(f1 instanceof Object) // 本身属于 Object
}

// 访问一个对象的属性时，现在基本属性中查找，如果没有，会再沿着__proto__这条链向上找，即原型链
{
  function Foo() {}
  var f1 = new Foo()
  f1.a = 10
  Foo.prototype.a = 100
  Foo.prototype.b = 200
  console.log('f1 keys ====>',f1.a)
  delete f1.a // 删除本身拥有的属性，则会根据__proto__这条链子向上查找
  console.log('Foo.prototype keys ===>',f1.a)
}

// 分别使用 for...in 和 hasOwnProperty 方法 遍历对象
{
  // 不论是否在自身能查找到的属性
  function Foo() {}
  var f1 = new Foo()
  f1.a = 10
  Foo.prototype.a = 100
  Foo.prototype.b = 200
  for (let key in f1) {
    console.log('Foo && f1 keys ===>',key)
  }

  // 仅为自身拥有的属性
  // hasOwnProperty 该方法是从 Object.prototype 上继承而来 
  for (let key in f1){
    if (f1.hasOwnProperty(key)){
        console.log('f1 keys ===>', key)  // 之所以有 a 是因为f1重新定义了一个a值
    }
  }
}

// 每个函数均有 call,apply,length,arguments,caller等属性
// 这些属性均是通过继承而来，函数由Function函数创建，因此继承自Function.prototype上的方法
// 而之所以有hasOwnProperty方法 是因为Function.property 也是 继承自 Object.property
// 即Function.property 的原型链 __proto__ 指向的 是 Object.property
// 这里再次强调,Object.property 的 __proto__ 指向的是 null
// 但是 Object.property 仍然继承到 Function的原型 方法，因为它的原型链上可以找到继承自Function.prototype
// 事实上js的继承链隐藏了两个部分—— Object.prototype 和 Function.prototype
// 继承关系如下：Object.prototype(构造器) 构造出 Function.prototype(构造器)
// 然后Function.prototype(构造器) 又构造出 Object(对象)，接着是 Function(对象) 继承自 Object(对象)。
{
   console.log( Object.prototype,Function.prototype )
}

/**
 *  创建对象的4种方法
 *  1.根据字面量和调用创建对象的函数
 *  2.工厂模式(函数内部创建对象，再统一返回该对象，即调用一次，会 new 一次对象)
 *  3.原型模式()
 *  4.构造函数模式
 *  5.合使用构造函数模式和原型模式
 *  6.Object.create方法
 */