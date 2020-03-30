/*
* 思路:
*   首先将所有的组合可能性列出来并添加到哈希表中
*   然后对字符串进行遍历,由于组合只有两种,一种是1个字符，一种是2个字符，其中2个字符优先于1个字符
*   先判断两个字符的组合在哈希表中是否存在，存在则将值取出加到结果ans中，并向后移2个字符.不存在则将判断当前1个字符是否存在，存在则将值取出加到
*   结果ans中,并向后移一个字符
*   遍历结束返回结果ans
 */
let romanToInt = function (s) {
  const map = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000
  };
  let ans = 0;
  for (let i = 0; i < s.length;) {
    if (i + 1 < s.length && map[s.substring(i, i + 2)]) {
      ans += map[s.substring(i, i + 2)];
      i += 2;
    } else {
      ans += map[s.substring(i, i + 1)];
      i ++;
    }
  }
  return ans;
};
