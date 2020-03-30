// 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
//
// 示例 1:
//
// 输入: 4->2->1->3
// 输出: 1->2->3->4
// 示例 2:
//
// 输入: -1->5->3->4->0
// 输出: -1->0->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {// 归并排序的时间复杂度为O(nlogn)
	if(head===null){
		return head;
	}
	ret = mergeSort(head);
	return ret;
	
	function mergeSort(items){// 归并算法
		if(items.next===null){
			return items;
		}
		var left = items;
		var right = getMid(items);
		return　merge(mergeSort(left), mergeSort(right));
	}
	
	function merge(left,right){// 合并
		var merge_result;
		if(left===null){
			return right;
		}else if(right===null){
			return left;
		}
		if(left.val<right.val){
			lead = left;
			left = left.next;
		}else{
			lead = right;
			right = right.next;
		}
		var tmp = lead;
		while(left!==null && right!==null){
			if(left.val<right.val){
				tmp.next = left;
				tmp = left;
				left = left.next;
			}else{
				tmp.next = right;
				tmp = right;
				right = right.next;
			}
		}
		if(left!==null){
			tmp.next = left;
		}else{
			tmp.next = right;
		}
		return lead;
	}
	
	function getMid(first){// 快慢指针获得中间点
		//guaranteed that at least two nodes
		var fast = first.next;
		var slow = first.next;
		var prev = first;
		while(true)
		{
			if(fast !== null)
				fast = fast.next;
			else
				break;
			if(fast !== null)
				fast = fast.next;
			else
				break;
			prev = slow;
			slow = slow.next;
		}
		prev.next = null;  // cut
		return slow;
	}
};

