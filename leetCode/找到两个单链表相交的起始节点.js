/**
 * 同步遍历 A、B 链表 pA 、 pB ，直到遍历完其中一个链表（短链表），如上图，设A为长链表
 * 那么此时 A、B 两遍表的长度差就为 pA 到链尾的长度，此时可以把 pB 指向长链表的表头 headA ，继续同步遍历，直到遍历完长链表
 * 此时，headA 到 pB 的长度就为两链表的长度差，pB 到链表的长度与 headB 到链尾的长度一致
 * 此时，可将 pA 指向 headB ，然后同步遍历 pB 及 pA ，直到有相交节点，返回相交节点，否则返回 null
 */
var getIntersectionNode = function (headA, headB) {
  let pA = headA, pB = headB;
  while (pA || pB) {
    if (pA === pB) {
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
    }
  }
  return null;
}


