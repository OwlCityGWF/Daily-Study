// 查找不含有重复字符的最长子串的长度
// 解法一: 维护数组
// 解题思路: 使用一个数组来维护滑动窗口,遍历字符串，判断字符是否在滑动窗口数组里.
// 不在则push进数组,在删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符push进数组
// 然后将max更新为当前最长子串的长度.\
// 优化的Map
/**
 * 1.使用map来存储当前已经遍历过的字符,key为字符,value为下标
 * 2.使用i来标记无重复子串开始下标,j为当前遍历字符下标。
 * 3.遍历字符串，判断当前字符串是否已经在map中存在,存在则更新无重复子串开始下标i为相同字符的下一位置
 * 此时从i到j为最新的无重复子串，更新max,将当前字符与下标放入map中
 * 4.返回max
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(), max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j])+ 1, i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j], j)
  }
  return max;
}
