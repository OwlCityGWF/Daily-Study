/*
* 给定一个链表,删除链表倒数第n个结点
 */
/*
* 思路:使用快慢指针
* fast指针提前走n+1步
* slow指针指向当前距离fast倒数第n个节点,初始为head
*
* 然后,fast，slow同步向前走,直到fast.next为null
* 此时,fast为最后一个节点,slow就是倒数第n+1个节点,此时问题就变更
* 为删除链表中的slow的后继节点
*
* 当当链表长度为n时,fast是前进不到n+1个节点位置的,所以，有两种解决方案:
* 创建一个头节点preHead,设置preHead.next = head, 这样就可以解决以上问题，删除倒数第n个节点后,返回的preHead.nexxt即可。
*
* 另外一种是,fast快指针提前走n步后,判断fast.next是否为null,即fast是否可以简化为删除头节点；
* 如果不是.fast=fast.next，fast再前进一步，slow为倒数第n+1个节点
 */
var removeNthFromEnd = function (head, n) {
  let preHead = new ListNode(0);
  preHead.next = head;
  let fast = preHead, slow = preHead;
  while (n--) {
    fast = fast.next;
  }
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
}

/**
 * 单独处理倒数第n节点
 */
var removeNthFromEnd = function (head, n) {
  let fast = head, slow = head;
  while (--n){
    fast = fast.next;
  }
  if (!fast.next) return head.next;
  fast = fast.next;
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
}

/**
 * 求链表中间节点(给定一个带有头节点head的非空单链表,返回链表的中间节点.如果有两个中间节点,则返回第二个中间节点)
 * 快慢指针
 * 快指针一次走两步,慢指针一次走一步,当快指针走到终点时，慢指针刚好走到中间.
 */
var middleNode = function (head) {
  let fast = head, slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
