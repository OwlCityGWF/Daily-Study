/**
 * 迭代法
 * @param head
 * @returns {null|*}
 */
var reverseList = function (head) {
  if (!head || !head.next) return head;

  var prev = null, curr = head;

  while (curr) {
    var next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  head = prev;
  return head;
}

// 解法二: 尾递归法
/**
 * 从头节点开始,递归反转它的每一个节点,直到null，
 */

var reverseList = function (head) {
  if (!head || !head.next) return head;
  head = reverse(null, head);
  return head;
}

var reverse = function (prev, curr) {
  if (!curr) return prev;
  var next = curr.next;
  curr.next = prev;
  return reverse(curr, next)
}

// 递归法
// 不断递归反转当前节点head的后继节点next
var reverseList = function (head) {
  if (!head || !head.next) return head;
  var next = head.next;
  var reverseHead = reverseList(next);
  next.next = head;
  head.next = null;
  return reverseHead;
}
