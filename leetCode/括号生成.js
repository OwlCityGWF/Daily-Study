/*
* 数字n代表生成括号的对数,设计一个函数,用于能够生成所有可能的并且有效的括号组合
* 输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
 */
/**
 * 思路
 * 1.第一次递归终止时需要将当前字符存入数组
 * 2.字符任取一个位置左侧必 左括号>=右括号
 * 3.每次递归除了需要传当前字符还需要记清当前左右括号数
 * @param n
 * @returns {[]}
 */
var generatParenthesis = function (n) {
  let res = [];
  const help = (cur, left, right) => {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    if (left < n) {
      help(cur + "(", left + 1, right);
    }
    if (right < left) {
      help(cur + ")", left, right + 1);
    }
  };
  help("", 0, 0)
  return res;
}
