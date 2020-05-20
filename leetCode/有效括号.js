/*
* 利用栈结构
* 将字符串中的字符依次入栈,遍历字符依次判断:
* 首先判断该元素是否是
* {,(,[直接入栈
* 否则该字符为},)]中的一种,如果该字符串有效，则该元素应该与栈顶匹配
* 当遍历完成时,所有已匹配出栈，如果此时栈为空，则字符串有效，反之无效.
 */
var isValid = function (s) {
  let map = {
    '{':'}',
    '(':')',
    '[':']'
  }

  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid("{[()]}"))
