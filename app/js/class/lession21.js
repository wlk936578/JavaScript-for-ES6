/**
 * 原型的灵活性
 * 
 * 
 */


// 当从原型继承过来的方法不合适，可以做出适当的修改
{
  // Array对象 和 Object对象 的原型方法不同，可以肯定的是，做了修改
  let obj = {a:10,b:20}  
  console.log(obj.toString())
  let arr = [1,2,true]
  console.log(arr.toString())
}

// 同理，自定义一个toString函数
{
 function Foo(){}
 let foo = new Foo()
 Foo.prototype.toString = function () {
     return '这是自定义后的toString方法'
 }
 console.log(foo.toString())
}
