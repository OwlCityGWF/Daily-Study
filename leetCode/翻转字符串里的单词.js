// 给定一个字符串,逐个翻转字符串中的每个单词
/**
 * 解法一,正则 + JS API
 */
// var reverseWords = function (s) {
//   return s.trim().replace(/\s+/g, '').split('').reverse();
// }

/**
 * 解法二:双端队列(不使用API)
 * 首先去除字符串左右空格,逐个读取字符串中的每个单词,依次放入双端队列的队头
 * 再将队列转换成字符串输出
 */
var reverseWords = function (s) {
  let left = 0;
  let right = s.length - 1;
  let queue = [];
  let word = "";

  while (s.charAt(left) === "") left++;
  while (s.charAt(right) === "") right--;

  while (left <= right){
    let char = s.charAt(left);
    if (char === "" && word) {
      queue.unshift(word);
      word = '';
    } else if (char !== "") {
      word += char;
    }
    left++
  }
  queue.unshift(word);
  return  queue.join('')
};
let test = reverseWords("  hello world!  ")
console.log(test)

