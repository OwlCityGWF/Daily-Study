/**
 * 实现int sqrt(int x)函数
 * 计算并返回x的平方根,其中x是非负整数.
 * 由于返回类型是整数,结果只保留整数部分,小数部分将被舍去.
 */
var mySqrt = function (x) {
  let left = 0, right = x, result = 0;
  let middle = 0;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (middle * middle <= x) {
      result = middle;
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return result;
}

let test = mySqrt(5);
console.log(test);
