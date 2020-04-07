/*
* 给定一个链表,删除链表的倒数第n个节点,并且返回链表的头节点
* 示例:
* 给定一个链表: 1->2->3->4->5 和n = 2;
* 当删除倒数第二个节点后,链表变为1->2->3->5
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let l = dummy;
  let r = dummy;
  let offset = n + 1;

  while (offset--) {
    r = r.next;
    if (offset > 1 && r === null) {
      return dummy.next;
    }
  }
  while (r) {
    r = r.next;
    l = l.next;
  }

  l.next = l.next.next;
  return dummy.next;
};
