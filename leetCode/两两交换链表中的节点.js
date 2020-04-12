/*
* 给定一个链表,两两交换其中相邻的节点,并返回交换后的链表
* 不能只是单纯的改变节点内部的值,而是需要实际的进行节点交换
* 示例
* 给定1->2->3->4，你应该返回2->1->4->3.
* 思路；非递归
* 添加一个哨兵节点
* 三个节点外加一个哨兵节点,用作指针指向变换操作
 */
var swapPairs = function (head) {
  let thead = new ListNode(0);
  thead.next = head;
  let tmp = thead;
  while (tmp.next != null && tmp.next.next != null) {
    let start = tmp.next;
    let end = start.next;
    tmp.next = end;
    start.next = end.next;
    end.next = start;
    tmp = start;
  }
  return thead.next;
};
