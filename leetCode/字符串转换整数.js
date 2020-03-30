/*
* 实现一个atoi函数,使其能将字符串转换成整数
* 首先,该函数会根据需要丢弃无用的开头空格字符,直到寻找到第一个非空格的字符为止。
* 当我们寻找到的第一个非空字符为正或者负号时,则将该负号与之后面尽可能多的连续数字组合起来，作为该整数的正负号;假如第一个非空字符是数字，
* 则直接将其与之后连续的数字字符组合起来，形成整数
* 该字符串除了有效的整数部分之后也可能会存在多余的字符,这些字符可以被忽略，它们对于函数不应该造成影响
*
 */
let myAtoi = function (str) {
    const reg = /\s*([-|\+]?[0-9]*).*/;
    const res = str.match(reg);
    const max = Math.pow(2,31) - 1;
    const min = -Math.pow(2,31);
    let n = 0;
    if (res) {
      n = +res[1];
      if (isNaN(n)) {
        n = 0;
      }
    }
    if (n > max) {
      return max;
    } else if ( n < min ) {
      return min;
    }
    return n
};
