/**
 * 给你一个链表,每k个节点一组进行翻转,返回翻转后的链表.
 * k是一个正整数,它的值小于或等于链表的长度.
 * 如果节点总数不是k的整数倍,那么请将最后剩余的节点保持原有顺序.
 * 示例: 1->2->3->4->5
 * 当 k = 2时,返回 2->1->4->3->5
 * 当 k = 3 时,返回 3->2->1->4->5
 */
/**
 * 思路:
 * 1.首先将链表节点按照K个一组分组，使用一个指针head依次指向每组的头节点。这个指针每次向前移动k步
 * 直至链表结尾。对于每个分组，我们先判断它的长度是否大于等于k，若是则翻转，否则不翻转.
 * 2.如何翻转一个分组内的子链表。对于一个子链表，除了翻转其本身之外，还需要将子链表的头部与上一个子链表链接，以及子链表的尾部与下一个子链表链接.
 * 因此，在翻转子链表的时候，我们不仅需要子链表头节点head，还需要有head的上一个节点pre,以便翻转完成后把子链表再接回pre.
 * 但是对于第一个子链表，它的头节点head前面是没有节点pre的,因此，我们新建一个节点，把它接到链表的头部，让它作为pre的初始值，这样head
 * 前面就有一个节点,我们就可以避开链表头部的边界条件。
 * 反复移动指针head与pre，对head所指向的子链表进行翻转，直到结尾，就可以得到答案，但是如何返回函数值?
 * 因为我们创建的节点pre，在一开始被链接到了头节点的前面，而无论之后链表有没有翻转，它的next
 * 指针都会指向正确的头节点。那么我们只要返回它的下一个节点就可以。
 */
const myReverse = (head, tail) => {
  let prev = tail.next;
  let p = head;
  while (prev !== tail) {
    const nex = p.next;
    p.next = prev;
    prev = p;
    p = next;
  }
  return [tail, head];
}

var reverseKGroup = function (head, k) {
  const hair = new ListNode(0);
  hair.next = head;
  let pre = hair;

  while (head) {
    let tail = pre;
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) {
        return hair.next;
      }
    }
    const nex = tail.next;
    [head, tail] = myReverse(head, tail);
    // 把子链表重新接回原链表
    pre.next = head;
    tail.next = nex;
    pre = tail;
    head = tail.next;
  }
  return hair.next;
}
