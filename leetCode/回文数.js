/*
* 判断一个整数是否是回文数.回文数是指正序(从左向右)和倒叙(从右向左)读都是一样的整数
 */
// 双指针法
const isPalindrome = (x) => {
  if (x < 0) {
    return false;
  }
  const str = x.toString();
  let i = 0;
  let j = str.length - 1;
  let flag = true;
  while (i < j) {
    if (str[i] !== str[j]) {
      flag = false;
      break;
    }
    i++;
    j--;
  }
  return false
};

let isPalindrome = function (x) {
  let xs = Math.abs(x); // 先转化为绝对值
  xs = xs + ''; // 转为字符串
  let iso, length;
  let ise = false; // 判断是否为负数,负数直接给false
  if (x < 0) {
    ise = true;
  }
  ((x + '').length) % 2 == 0 ? iso = true : iso = false;// 判断奇偶数
  if (iso) { // 偶数的循环长度不减1
    length = Math.floor((xs.length) / 2);
    for (let i = 0; i <= length ; i++) {
      if (xs[i] != xs[(x + '').length - 1 - i] || ise) {
        return false;
      }
    }
  } else { // 奇数的循环长度减1
    length = Math.floor(xs.length / 2) - 1;
    for (let i = 0; i <= length ; i++) {
      if (xs[i] != xs[(x + '').length - 1 - i] || ise) {
        return false;
      }
    }
  }
  return true;
};

/*
* 二分法对比原则
* 解题思路
* 回文,即以位于正中间的数字为中点进行分割,两边的数据完全对称
* 所以,如果设定一个循环,从整数第一位下标开始,第一位与最后一位对比,第二位与倒数第二位对比，
* 回文两边的数字会全部相等，循环次数最大值为Math.floor(x.length/2),而如果不一致,则判断非回文，即刻退出循环
* 另外，负数肯定不是回文,所以单独拎出来做一个判断
 */
let isPalindrome = function (x) {
  if (x<0) return false;
  let flag = true;
  x = x.toString();
  for (let i = 0, len = x.length; i < len / 2; i++) {
    if (x[i] !== x[len-1-i]) {
      flag = false;
      break;
    }
  }
  return flag;
};
