/**
 * 高阶函数
 *
 */

// js 内置的高阶函数 如 Array.prototype.map
// 举个例子区分一下 使用map 和不使用map 如何解决相同的问题
{
  // 不使用map 直接for循环 赋值
  const arr1 = [1, 2, 3, 4];
  let arr2 = [];
  let i = 0;
  for (; i < arr1.length; i++) {
    arr2.push(arr1[i]);
  }
  console.log(arr2);
}

// 使用高阶函数 map遍历赋值
{
  const arr1 = [1, 2, 3, 4];
  let arr2 = [];
  arr2 = arr1.map(item => item);
  console.log(arr2);
}

// 再举个例子 根据出生年份判断 具体岁数。并放入数组
{
  const birthYear = [1975, 1997, 2002, 1995, 1985];
  let ages = [];
  let i = 0;
  let len = birthYear.length;
  for (; i < len; i++) {
    let age = 2018 - birthYear[i];
    ages.push(age);
  }
  console.log('不使用高阶函数', ages);
}
{
  const birthYear = [1975, 1997, 2002, 1995, 1985];
  let ages = [];
  ages = birthYear.map(item => 2018 - item);
  console.log('使用高阶函数', ages);
}

// Array.prototype.filter
// 例子
{
  const person = [
    { name: 'picker', age: 16 },
    { name: 'mark', age: 18 },
    { name: 'john', age: 27 },
    { name: 'jane', age: 14 },
    { name: 'Tony', age: 24 }
  ];
  const fullAge = [];
  let i = 0;
  let len = person.length;
  for (; i < len; i++) {
    if (person[i].age > 18) {
      fullAge.push(person[i]);
    }
  }
  console.log('不使用高阶函数 ===>', fullAge);
}

{
  const person = [
    { name: 'picker', age: 16 },
    { name: 'mark', age: 18 },
    { name: 'john', age: 27 },
    { name: 'jane', age: 14 },
    { name: 'Tony', age: 24 }
  ];
  const fullAge = person.filter(item => item.age > 18);
  console.log('使用高阶函数 ===>', fullAge);
}

// Array.prototype.reduce
// reduce的回调函数接受4个参数 accumulator，currentValue，currentIndex，sourceArray
// 例子 计算数组中的总和
{
  const arr = [5, 7, 1, 8, 4];
  let sum = 0;
  let i = 0;
  let len = arr.length;
  for (; i < len; i++) {
    sum += arr[i];
  }
  console.log('不使用高阶函数 reduce ===>', sum);
}

{
  // 使用高阶函数
  const arr = [5, 7, 1, 8, 4];
  let sum = arr.reduce((accumulator, currentValue) => {
    // accumulator 会保留从reduce返回先前操作的结果
    // 并将currentValue设置为数组的当前值
    return accumulator + currentValue;
  }); // 此处还能加入一个 initialValue参数，如果定义了该参数，
  // accumulator将会等于initialValue
  console.log('使用高阶函数 reduce ===>', sum);
}

/**
 * 结论:使用高阶函数能使用代码变得更加干净整洁不啰嗦
 *
 */

// 尝试自己写一个map方法
{
  let strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];
  if (!Array.prototype.mapFn) {
    Array.prototype.mapFn = function(fn) {
      const array = this;
      const newArray = [];
      let i = 0;
      let len = array.length;
      for (; i < len; i++) {
        newArray.push(fn(array[i])); // 此处的this指向的是 strArray,即 Array的 实例对象
      }
      return newArray;
    };
  }
  const mapArray = strArray.mapFn(item => {
    return item;
  });
  console.log('原型上扩展的自定义map方法', mapArray);
  for (const item in [11, 33, 55]) {
    console.log(item); // 此处使用for...in循环会出现意外,mapfn 被暴露出来
  }
}

// 进一步优化
{
  Object.defineProperty(Array.prototype, 'mapFn', {
    value: function(fn) {
      const array = this;
      const newArray = [];
      let i = 0;
      let len = array.length;
      for (; i < len; i++) {
        newArray.push(fn(array[i])); // 此处的this指向的是 strArray,即 Array的 实例对象
      }
      return newArray;
    },
    enumerable: false // 此处设置枚举属性为false,这样用for...in循环时不会被暴露出来
  });

  let strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];
  const mapArray = strArray.mapFn(item => {
    return item;
  });
  console.log('原型上扩展的自定义map方法', mapArray);
  for (const item in [11, 33, 55]) {
    console.log(item);
  }
}
