/**
 * 数值扩展 1.新增方法 2.方法调整
 *
 *
 */

// 二进制以0b开头 八进制以0o 不区分大小写
{
  console.log(0b111110111)
  console.log(0o767)
}

// Number.isFinite 数值是否有尽
{
  console.log('15', Number.isFinite(15))
  console.log('NaN', Number.isFinite(NaN))
  console.log('1/0', Number.isFinite('true' / 0))
  console.log('NaN', Number.isNaN(NaN))
  console.log('NaN', Number.isNaN(0))
}

// 是否为整数 接受参数必须为数字

{
  console.log('25', Number.isInteger(25))
  console.log('25.0', Number.isInteger(25.0)) // true
  console.log('25.1', Number.isInteger(25.1)) // false
  console.log('25', Number.isInteger('25')) // false
}

{
  console.log(Number.MAX_SAFE_INTEGER) // 常量，js数字最大上限
  console.log(Number.MIN_SAFE_INTEGER) // 常量，js数字最小下限
  console.log('10', Number.isSafeInteger(10))
  console.log('a', Number.isSafeInteger('a'))
}

// 判断带小数的整数部分 只取整数部分，不会四舍五入

{
  console.log('4.1', Math.trunc(4.1))
  console.log('4.9', Math.trunc(4.9))
}

// 判断是否为正数负数和零 分别为-1,0,1

{
  console.log('-5', Math.sign(-5))
  console.log('0', Math.sign(0))
  console.log('5', Math.sign(5))
  console.log('6', Math.sign('6')) // 自动转换为Number对象再判断
  console.log('abc', Math.sign('abc')) // 自动转换为Number对象再判断
}

// 处理立方根

{
  console.log('-1', Math.cbrt(-1))
  console.log('8', Math.cbrt(8))
}

// 三角函数，对数方法
{
}
