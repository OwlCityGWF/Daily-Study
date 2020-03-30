/*
* 给定一个带有头节点head的非空单链表,返回链表的中间节点
* 如果有两个中间节点,则返回第二个中间节点
 */
/*
* 方法一: 数组
* 思路和算法
* 链表的缺点在于不能通过下标访问对应元素.因此我们考虑对链表进行遍历,
* 同时将遍历到的元素依次放入数组A中.如果我们遍历到了N个元素,那么链表以及数组的长度也为N，
* 对应的中间节点即为A[N/2].
 */
let middleNode = function (head) {
  let A = [head];
  while (A[A.length - 1].next != null)
  A.push(A[A.length - 1].next);
  return A[Math.trunc(A.length / 2)];
};
/*
* 复杂度分析
* 时间复杂度: O(N),其中N是给定链表中的节点数目.
* 空间复杂度: O(N),即数组A用去的空间
 */

/*
* 方法二: 单指针法
* 对链表进行两次遍历,第一次遍历时,统计链表中的元素个数N；
* 第二次遍历时,我们遍历到第N/2个元素(链表的首节点为第0个元素)
* 时,将该元素返回即可
 */
// class Solution {
//   public ListNode middleNode(ListNode head) {
//     int n = 0;
//     ListNode cur = head;
//     while (cur != null) {
//       ++n;
//       cur = cur.next;
//     }
//     int k = 0;
//     cur = head;
//     while (k < n / 2) {
//       ++k;
//       cur = cur.next;
//     }
//     return cur;
// }
// }
/*
* 复杂度分析
* 时间复杂度: O(N),其中N是给定链表的节点数目
* 空间复杂度:O(1),只需要常数空间存放变量和指针
 */

/*
* 方法三：快慢指针法
* 思路和算法
* 用两个指针slow与fast一起遍历链表。slow一次走一步,fast
* 一次走两步.那么当fast到达链表的末尾时,slow必然位于中间
 */
let middleNode = function (head) {
  slow = fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next();
  }
  return slow;
};
/*
* 复杂度分析
* 时间复杂度: O(N),其中N是给定链表的节点数目
* 空间复杂度: O(1),只需要常数空间存放slow和fast两个指针
 */
