/*
* 将一个给定字符串根据给定的行数，以从上往下，从左往右进行Z字形排列
* 比如输入字符串为"LEETCODEISHIGINNG"行数为三时排列如下
* L   C   I   R
* E T O E S I I G
* E   D   H   N
* 之后,你的输出需要从左往右逐行读取,产生出一个新的字符串,比如:"LCIRETOESIIGEDHN"
 */
/*
* 思路
* 整体的思路是遍历字符串,遍历过程中将每行看成新的字符串构成字符串数组，最后再将该数组拼接起来即可
* 如果numRows = 1则说明当前字符串即为结果，直接返回.
* 否则整个字符串需要经历,向下向右,向下向右，这样的反复循环过程,设定downn变量表示是否向下,loc变量表示当前字符串数组的下标
* 如果down为true,则loc += 1，字符串数组下标向后移动,将当前字符加入当前字符串中.
* 如果down为false，则表示向右,则loc -= 1,字符串数组下标向前移动,将当前字符加入当前字符串中
* 时间复杂度:O(n),n为字符串的s长度.
 */
let convert = function (s, numRows) {
  if (numRows === 1) {
    return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for (let i = 0; i < len; i++) {
      rows[i] = "";
    }
    let loc = 0;
    let down = false;
    for (const c of s) {
      rows[loc] += c;
      if (loc === 0 || loc === numRows - 1) {
          down = !down;
          loc += down ? 1 : -1;
      }

      let ans = "";
      for (const row of rows) {
        ans += row;
      }
      return ans;
    }
  }
};
