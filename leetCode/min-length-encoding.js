/*
* 给定一个单词列表，我们将这个列表编码成一个索引字符串 S 与一个索引列表 A。
* 例如，如果这个列表是 ["time", "me", "bell"]，我们就可以将其表示为 S = "time#bell#" 和 indexes = [0, 2, 5]。
* 对于每一个索引，我们可以通过从字符串 S 中索引的位置开始读取字符串，直到 "#" 结束，来恢复我们之前的单词列表。
* 那么成功对给定单词列表进行编码的最小字符串长度是多少呢？
 */
/*
* 思路：剔除重复词尾的思路,通过哈希表降低查询的复杂度(空间换时间)
* 对words中的每个元素的词尾做切片并比对，如果词尾出现在words中，则删除该元素
 */
var minimumLengthEncoding = function (words) {
  let hashSet = new Set(words);
  for (let item of hashSet) {
    for (let i = 0; i < item.length; i++) {
      let target = item.slice(i);
      hashSet.has(target) && hashSet.delete(target);
    }
  }
  let result = 0;
  hashSet.forEach(item => result += item.length + 1);
  return result;
};
