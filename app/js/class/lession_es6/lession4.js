/**
 * 字符串扩展 新特性:1.Unicode表示法
 *  2.遍历接口
 *  3.模板字符串
 *  4.新增方法(10种)
 */

// 大括号包住的 unicode编码 可以大于2个字节进行识别

{
  console.log('a', '\u0061')
  console.log('s', '\u20BB7')
  console.log('s', '\u{20BB7}')
}

{
  let s = '𠮷' // length长度为2 4个字节
  console.log('length', s.length)
  console.log('1', s.charAt(0)) // es5写法，取字符串
  console.log('1', s.charAt(1))
  console.log('at0', s.charCodeAt(0)) // es5写法，取 unicode 值
  console.log('at1', s.charCodeAt(1))

  let s1 = '𠮷a'
  console.log('length', s1.length)
  console.log('code0', s1.codePointAt(0)) // es6新方法，取字符码值(自动取4个字节)
  console.log('code0', s1.codePointAt(0).toString(16)) // 转换字符十六进制
  console.log('code1', s1.codePointAt(1)) // 只取后两个字节（at1一致,不完整）
  console.log('code2', s1.codePointAt(2)) // 转换字符十六进制
}

// fromCodePoint 区别在于能否处理大于2个字节的unicode编码

{
  console.log(String.fromCharCode('0x20bb7')) // es5
  console.log(String.fromCodePoint('0x20bb7')) // es6
}

// 遍历器接口

{
  let str = '\u{20bb7}abc'
  for (let i = 0; i < str.length; i++) {
    console.log('es5', str[i])
  }
  for (let code of str) {
    // 遍历器可以正常处理大于2个字节的unicode编码
    console.log('es6', code)
  }
}

// 判断字符串中是否包含某些字符
{
  let str = 'string'
  console.log(str.includes('r'))
  console.log(str.includes('c'))
  console.log(str.startsWith('str')) // 判断字符串是否以str字符为起始
  console.log(str.endsWith('ng')) // 判断字符串是否以str字符为结束
}

// 重复
{
  let str = 'abc'
  console.log(str.repeat(2))
}

// 模板字符串
{
  let name = 'list'
  let info = 'hello world'
  let m = `i am ${name},${info}`
  console.log(m)
}

// es7 提案（自动补白）
{
  console.log('1'.padStart(2, '0')) // 向前自动补白 如日期 如日期为1号，自动补白为01
  console.log('1'.padEnd(2, '0')) // 向后自动补白 如日期 如日期为1号，自动补白为10
}

// 标签模板 作用 过滤html字符串, 过滤xss攻击，处理多语言转换
{
  let user = {
    name: 'list',
    info: 'hello world'
  }
  console.log(abc`i am ${user.name}, ${user.info}`)
  function abc(s, v1, v2) {
    console.log(s, v1, v2)
    return s + v1 + v2
  }
}

// raw
{
  console.log(String.raw`Hi\n${1 + 2}`) // \n 换行符没生效 raw对所有的斜杠进行转义
  console.log(`Hi\n${1 + 2}`)
}
