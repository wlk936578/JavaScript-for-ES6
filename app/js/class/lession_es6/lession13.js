/**
 * 类
 *  1.基本语法 2.类的继承 3.静态方法
 *  4.静态属性 5.getter 6.setter
 *
 */

{
  // 基本定义 和 生成实例
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
  }
  let v_parent = new Parent('v')
  console.info('构造函数 和 实例', v_parent)
}

// 继承
{
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
  }

  class child extends Parent {}
  console.info('继承', new child())
}

// 覆盖父类的值 继承传递参数
{
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
  }

  class child extends Parent {
    constructor(name = 'child') {
      super(name) // 向父类传递参数
      this.type = 'child-type' // super之后才能定义自己的新属性
    }
  }
  console.info('继承传递参数', new child('喵喵'))
}

// getter 和 setter
{
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
    get longName() {
      // 定义的是成员属性而不是方法
      return 'mk' + this.name
    }
    set longName(value) {
      this.name = value
    }
  }
  let parent = new Parent('我是大神')
  console.info('getter', parent.longName)
  parent.longName = 'hello'
  console.info('setter', parent.longName)
}

// 静态方法(通过类来调用，而非实力调用)
{
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
    static tell() {
      console.log('tell')
    }
  }
  Parent.tell()
}

// 静态属性
{
  class Parent {
    constructor(name = 'muke') {
      this.name = name
    }
    static tell() {
      console.log('tell')
    }
    // 静态属性没有关键字
  }
  Parent.type = 'test'
  console.log('静态属性', Parent.type) //非实例化
}
