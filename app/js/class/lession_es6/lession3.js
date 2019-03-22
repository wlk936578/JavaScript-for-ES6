/**
 * es6正则特性
 * 变化包括: 1.构造函数变化 2.正则方法扩展 3.u修饰符 4.y修饰符(粘粘模式) 5.s修饰符
 *
 */

{
  let reg = new RegExp('xyz', 'i') // 第一个参数为字符串(es5)
  let reg2 = new RegExp(/xyz/i) // 仅仅一个参数，作为正则表达式(es5)
  console.log(reg.test('xyz123'), reg2.test('xyz123'))

  let reg3 = new RegExp(/xyz/gi, 'i') // 可为两个参数(es6) es6允许第一个参数为正则表达式，允许第二个位修饰符，而后者修饰符会覆盖前者修饰符
  console.log(reg3.flags) // flags 获取修饰符
}

// y修饰符

{
  let s = 'bbb_bb_b'
  let a1 = /b+/g
  let a2 = /b+/y
  console.log('one', a1.exec(s), a2.exec(s)) // 第一步匹配  相同点：都是全局匹配 不同点: g修饰符从上次继续匹配 只要中间 匹配即可(忽略下划线),y修饰 匹配第一个后必须从下个字符开始匹配成功才算
  console.log('two', a1.exec(s), a2.exec(s)) // 第二步匹配

  console.log(a1.sticky, a2.sticky) // 判断是否开启粘粘模式
}

// u修饰符 unicode 匹配专用

{
  console.log('u-1', /^\uD83D/.test('\uD83d\uDC2A')) // 匹配字符串 当成2个字符
  console.log('u-1', /^\uD83D/u.test('\uD83d\uDC2A')) // 匹配字符串 u修饰 会把4个字节当成1个字符

  console.log(/\u{61}/.test('a'))
  console.log(/\u{61}/u.test('a')) // 加上u修饰符，会主动识别unicode 编码 (若unicode编码超过2个字节，不用u修饰符将无法识别)
  console.log(`\u{20BB7}`)
  let s = '𠮷'
  console.log('u', /^.$/.test(s))
  console.log('u-2', /^.$/u.test(s))
  console.log('test', /𠮷{2}/.test('𠮷𠮷'))
  console.log('test-2', /𠮷{2}/u.test('𠮷𠮷'))
}

// s修饰符(提案) 识别点，杠等特殊字符
