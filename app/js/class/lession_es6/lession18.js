/**
 * 模块化
 *  1.基本概念
 *  2.ES6模块化语法
 */

// 第一种写法
// export let A = 123 // 不建议直接导入

// export function test() {
//   console.log('test')
// }

// export class Hello {
//   test() {
//     console.log('class')
//   }
// }

let A = 123 // 不建议直接导入

function test() {
  console.log('test')
}

class Hello {
  test() {
    console.log('class')
  }
}
/**
 *  好处:
 *   1.不会因误操作将不需要的变量暴露出来
 *	 2.不需要特意留意导出的方法
 *
 */
export default {
  A,
  test,
  Hello
}
