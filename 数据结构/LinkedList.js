// /**
//  * 链表存储有序的元素的集合,链表中的元素在内存中并不是连续放置的
//  * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用组成.
//  * 好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要指针，
//  * 而想要访问链表中间的一个元素,需要从起点开始迭代列表直到找到所需的元素.
//  * @constructor
//  */
// function LinkedList() {
//
// 	var Node = function (element) {
// 		this.element = element;
// 		this.next = null;
// 	};
//
// 	var length = 0;
// 	var head = null;
//
// 	this.append = function (element) {
// 		var node = new Node(element),
// 			current;
//
// 		if (head === null) { // 列表中第一个节点
// 			head = node;
// 		} else {
// 			current = head;
//
// 			// 循环列表,直到找到最后一项
// 			while (current.next) {
// 				current = current.next;
// 			}
//
// 			// 找到最后一项,将其next赋为node,建立链接
// 			current.next = node;
// 		}
//
// 		length++; // 更新列表的长度
// 		console.log(element);
// 	};
//
// 	this.insert = function (position, element) {
// 		//  检查越界值
// 		if (position >= 0 && position <= length) {
// 			var node = new Node(element),
// 				current = head,
// 				previous,
// 				index = 0;
// 			if (position === 0) {   // 在第一个位置添加
// 				node.next = current;
// 				head = node;
// 			} else {
// 				while (index++ < position){
// 					previous = current;
// 					current = current.next;
// 				}
// 				node.next = current;
// 				previous.next = node;
// 			}
// 			length++;   // 更新列表的长度
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	};
// 	this.removeAt = function (position) {
// 		// 检查越界值
// 		if (position > -1 && position < length) {
// 			var current = head,
// 				previous, index = 0;
// 			// 移除第一项
// 			if (position === 0) {
// 				head = current.next;
// 			} else {
// 				while (index++ < position) {
// 					previous = current;
// 					current = current.next;
// 				}
// 				// 将previous与current的下一项链接起来；跳过current,从而移除它
// 				previous.next = current.next;
// 			}
// 			length--;
// 			return current.element;
// 		} else {
// 			return  null;
// 		}
// 	};
// 	this.remove = function (element) { };
// 	this.indexOf = function (element) {
// 		var current = head,
// 			index = -1;
// 		while (current){
// 			if (element === current.element) {
// 				return index;
// 			}
// 			index++;
// 			current = current.next;
// 		}
// 		return -1;
// 	};
// 	this.isEmpty = function () { };
// 	this.size = function () { };
// 	this.toString = function () {
// 		var current = head,
// 				string = '';
// 		while (current) {
// 			string = current.element;
// 			current = current.next;
// 		}
// 		return string;
// 	};
// 	this.print = function () { };
// }
//
// var list = new LinkedList();
// list.append(15);
//
// /**
//  * 双向链表:
//  * 在双向链表中：一个链向下一个元素，另一个链向前一个元素.
//  */
// function DoublyLinkedList() {
// 	var Node = function (element) {
// 		this.element = element;
// 		this.next = null;
// 		this.prev = null; // 新增
// 	};
//
// 	var length = 0;
// 	var head = null;
// 	var tail = null; // 新增 保存对列表最后一项的引用
//
// 	this.insert = function (position, element) {
// 		if (position >= 0 && position <= length) {
// 			var node = new Node(element),
// 				current = head,
// 				previous,
// 				index = 0;
//
// 			if (position === 0) {
// 				if (!head) {
// 					head = node;
// 					tail = node;
// 				} else {
// 					node.next = current;
// 					current.prev = node;
// 					head = node;
// 				}
// 			} else if (position === length) {
// 				current = tail;
// 				current.next = node;
// 				node.prev = current;
// 				tail = node;
// 			} else {
// 				while (index++ < position) {
// 					previous = current;
// 					current = current.next;
// 				}
// 				node.next = current;
// 				previpus.next = node;
//
// 				current.prev = node;
// 				node.prev = previous
// 			}
// 			length++;
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	};
// 	this.removeAt = function (position) {
// 		if (position > -1 && position < length) {
// 			var current = head,
// 				previous,
// 				index = 0;
//
// 			if (position === 0) {
// 				head = current.next;
// 				if (length === 1) {
// 					tail = null;
// 				} else {
// 					head.prev = null;
// 				}
// 			} else if (position === length - 1) {
// 				current = tail;
// 				tail = current.prev;
// 				tail.next = null;
// 			} else {
// 				while (index++ < position) {
// 					previous = current;
// 					current = current.next;
// 				}
//
// 				previous.next = current.next;
// 				current.next.prev = previous;
// 			}
//
// 			length--;
//
// 			return current.element;
// 		} else {
// 			return null;
// 		}
// 	}
// }
//
// /**
//  * 循环链表和链表之间唯一的区别在于，最后一个元素指向下一个
//  * 元素的指针不是引用null,而是指向第一个元素(head)
//  */
//
class ListNode {
	constructor(key) {
		this.next = null;
		this.key = key;
	}
}

class List {
	constructor() {
		this.head = null;
		this.length = 0;
	}
	
	static createNode(key) {
		return new ListNode(key);
	}
	
	// 往头部插入数据
	insert(node) {
		// 如果head后面有指向的节点
		if (this.head) {
			node.next = this.head;
		} else {
			node.next = null;
		}
		this.head = node;
		this.length++;
	}
	
	find(key) {
		let node = this.head;
		while (node !== null && node.key !== key) {
			node = node.next;
		}
		return node;
	}
	
	delete(node) {
		if (this.length === 0) {
			throw 'node is undefined';
		}
		
		if (node === this.head) {
			this.head = node.next;
			this.length--;
			return;
		}
		
		let prevNode = this.head;
		
		while (prevNode.next !== node) {
			prevNode = prevNode.next;
		}
		
		if (node.next === null) {
			prevNode.next = null;
		}
		if (node.next) {
			prevNode.next = node.next;
		}
		this.length--;
	}
}

// class ListNode {
// 	constructor(key) {
// 		// 指向前一个节点
// 		this.prev = null;
// 		// 指向后一个节点
// 		this.next = null;
// 		// 节点的数据(或者用于查找的键)
// 		this.key = key;
// 	}
// }
//
// /**
//  * 双向链表
//  */
// class List {
// 	constructor() {
// 		this.head = null;
// 	}
//
// 	static createNode(key) {
// 		return new ListNode(key);
// 	}
//
// 	insert(node) {
// 		node.prev = null;
// 		node.next = this.head;
// 		if (this.head) {
// 			this.head.prev = node;
// 		}
// 		this.head = node;
// 	}
//
// 	search(key) {
// 		let node = this.head;
// 		while (node !== null && node.key !== key) {
// 			node = node.next;
// 		}
// 		return node;
// 	}
//
// 	delete(node) {
// 		const { prev, next } = node;
// 		delete node.prev;
// 		delete node.next;
//
// 		if (node === this.head) {
// 			this.head = next;
// 		}
//
// 		if (prev) {
// 			prev.next = next;
// 		}
// 		if (next) {
// 			next.prev = prev;
// 		}
// 	}
// }
