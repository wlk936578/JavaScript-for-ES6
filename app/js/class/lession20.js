/**
 * Function 和 Object 之间的关系
 *  1. 一切对象都最终继承自Object对象，Object对象直接继承自根源对象 null
 *  2. 一切函数对象（包括Object对象)都直接继承自Function对象
 *  2.1 Function其实不仅让我们用于构造函数，它也充当了函数对象的构造器，
 *  甚至它也是自己的构造器
 *  js中对象.__proto__ === 构造器.prototype，由此可以见得它们之间的关系
 *  1.Function 对象 的原型链为 Function对象 -> Function.prototype ->
 *  Object.prototype -> null
 *  2.Object 继承自 Function，Object 的原型链为 Object对象 ->
 *  Function.prototype -> Object.prototype -> null，原型链又绕回来了，
 *  并且跟第一点没有冲突。可以说 Object 和 Function 是互相继承的关系。
 *  (因为Function对象 和 Object对象 的 原型链上 最终都继承自Object.prototype)
 */

{
    console.log('Object->null ===>',Object.prototype.__proto__) // 一切的根源
    console.log('Function->Object ===>', Function.prototype.__proto__ === Object.prototype) // 开天辟地
    console.log('Object->Function ===>', Object.__proto__ === Function.prototype) // 万物生长
    console.log('Function->Function ===>', Function.__proto__ === Function.prototype) // 自己对象继承在自己的原型对象，太骚了
    console.log('Object->Object ===>',Object.__proto__.__proto__ === Object.prototype) // 先继承自Function,再继承自Object
    // Function对象 是 Function类型，同时也是Object类型，具有双重继承，即原型链上既有Object.prototype 也有 Function.prototype
    // Object对象原型链同上
    // 重新梳理下，先是由 Object的原型对象 构造 出 Function的原型,而Function.prototype也是一个对象，所以它是继承自Object原型且原型链指向 Object，
    // 再由Function的原型对象 构造出 Function对象 和 Object对象 
    // 最后Object对象 的原型链上最终指向还是Object的原型对象
}

