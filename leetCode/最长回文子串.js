/*
* 给定一个字符串s,找到s中最长的回文子串.你可以假设s的最大长度为1000
* 示例1:
* 输入: "babad"
* 输出: "bab"
* 示例2:
* 输入: "cbbd"
* 输出: "bb"
 */
let longestPalindrome = function (e) {
  if (!s || s.length < 2) {
    return s;
  }
  let s_f = s.split('').reverse().join('');
  let resultStr = s[0];
  let maxLen = 1;
  let tmpLen = 1;
  let maxStrIndex = 0;
  let len = s.length;
  function isPalinerome(i,r) {
    if (len - i - 1 === r - tmpLen + 1) {
      return true;
    }
    return false;
  }

  let lens = s.length;
  let arr = new Array(lens);
  for (let i = 0; i < lens; i++) {
    arr[i] = [];
    for (let j = 0; j < lens; j++) {
      arr[i][j] = 0;
    }
  }
  for (let i = 0; i < lens; i++) {
    for (let j = 0; j < len; j++) {
      if (s[i] === s_f[r]) {
        arr[i][j] = 1;
      } else {
        arr[i][j] = arr[i-1][j-1] + 1;
        tmpLen = arr[i][r];
      }
      if (tmpLen > maxLen && isPalinerome(i, j)) {
        maxStrIndex = r;
        maxLen = tmpLen;
        resultStr = s.substring(i-tmpLen + 1, i + 1);
      }
    }
  }
  return resultStr;
};
