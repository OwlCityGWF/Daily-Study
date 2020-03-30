/*
* 给定一个只包含'(',')','{','}','[',']'的字符串,判断字符串是否有效
* 有效字符串需满足:
* 1.左括号必须用相同类型的右括号闭合
* 2.左括号必须以正确的顺序闭合
* 思路：
* 利用栈
* 遇到左括号，一律推入栈中
* 遇到右括号，将栈顶元素拿出，如果不匹配则返回false，如果匹配则继续循环
* 为了提高性能，在循环前进这一步,let len = s.length是非常关键的，减少计算次数
* 为了提高执行时间，这一步if(len%2)return false,减少不必要的计算
 */
var isValid = function (s) {
  let arr = [];
  let len = s.length;
  if (len%2) return false;
  for (let i = 0; i < len; i++) {
    let letter = s[i];
    switch (letter) {
      case "(":
        arr.push(letter);
        break;
      case "[":
        arr.push(letter);
        break;
      case "{":
        arr.push(letter);
        break;
      case ")":
        if (arr.pop() !== "(") return false;
        break;
      case "]":
        if (arr.pop() !== "[") return false;
        break;
      case "}":
        if (arr.pop() !== "{") return false;
        break;
    }
  }
  return !arr.length;
};
