/*
* 编写一个函数来查找字符串数组中的最长公共前缀。
* 如果不存在，则返回空字符串""
 */
/**
 * 思路
 * 当字符串数组长度为0时则公共前缀为空，直接返回
 * 令最长公共前缀为ans的值为第一个字符串,进行初始化
 * 遍历后面的字符串,依次将其与ans进行比较，两两找出公共前缀，最终结果即为最长公共前缀
 * 如果查找过程中出现了ans为空的情况。则公共前缀不存在直接返回
 * 时间复杂度:O(s)。s为所有字符串的长度之和
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(strs.length == 0)
    return "";
  let ans = strs[0];
  for(let i =1;i<strs.length;i++) {
    let j=0;
    for(;j<ans.length && j < strs[i].length;j++) {
      if(ans[j] != strs[i][j])
        break;
    }
    ans = ans.substr(0, j);
    if(ans === "")
      return ans;
  }
  return ans;
};

/**
 * 分治策略，归并思想
 * 问题: 求多个字符串的最长公共前缀
 * 分解成多个相似的子问题:求两个字符串的最长公共前缀.
 * 子问题可以简单求解.
 * 愿问题的解为子问题解的合并。
 */
var longestCommonPrefix = function (strs) {
  if (strs === null || strs.length === 0) return "";
  return LCPrefixRec(strs);
}

function LCPrefixRec(arr) {
  let length = arr.length;
  if (length === 1) {
    return arr[0]
  }

  let mid = Math.floor(length / 2),
      left  = arr.slice(0,mid),
      right = arr.slice(mid, length);

  return LCPrefixTwo(LCPrefixRec(left), LCPrefixRec(right));
}

function LCPrefixTwo(str1, str2) {
  let j = 0;
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) {
      break;
    }
  }

  return str1.substring(0,j)
}
