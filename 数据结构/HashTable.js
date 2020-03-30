function LinkedList() {
	
	var Node = function (element) {
		this.element = element;
		this.next = null;
	};
	
	var length = 0;
	var head = null;
	
	this.append = function (element) {
		var node = new Node(element),
			current;
		
		if (head === null) { // 列表中第一个节点
			head = node;
		} else {
			current = head;
			
			// 循环列表,直到找到最后一项
			while (current.next) {
				current = current.next;
			}
			
			// 找到最后一项,将其next赋为node,建立链接
			current.next = node;
		}
		
		length++; // 更新列表的长度
	};
	
	this.insert = function (position, element) {
		//  检查越界值
		if (position >= 0 && position <= length) {
			var node = new Node(element),
				current = head,
				previous,
				index = 0;
			if (position === 0) {   // 在第一个位置添加
				node.next = current;
				head = node;
			} else {
				while (index++ < position){
					previous = current;
					current = current.next;
				}
				node.next = current;
				previous.next = node;
			}
			length++;   // 更新列表的长度
			return true;
		} else {
			return false;
		}
	};
	this.removeAt = function (position) {
		// 检查越界值
		if (position > -1 && position < length) {
			var current = head,
				previous, index = 0;
			// 移除第一项
			if (position === 0) {
				head = current.next;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				// 将previous与current的下一项链接起来；跳过current,从而移除它
				previous.next = current.next;
			}
			length--;
			return current.element;
		} else {
			return  null;
		}
	};
	this.remove = function (element) { };
	this.indexOf = function (element) {
		var current = head,
			index = -1;
		while (current){
			if (element === current.element) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	};
	this.isEmpty = function () { };
	this.size = function () { };
	this.toString = function () {
		var current = head,
			string = '';
		while (current) {
			string = current.element;
			current = current.next;
		}
		return string;
	};
	this.print = function () { };
	this.getHeader = function () {
		return head;
	};
}

/**
 * 给定一个键值，然后快速返回值在表中的地址
 * @constructor
 */
function HashTable() {
	var table = [];
	
	var valuePair = function (key, value) {
		this.key = key;
		this.value = value;
		
		this.toString = function () {
			return '[' + this.key + ' - ' + this.value + ']';
		};
		
		
	};
	
	// this.put = function (key, value) {
	// 	var position = djb2HashCode(key); 		// 计算表中的位置
	// 	console.log(position + '-' + key);
	// 	table[position] = value; // 将value参数添加到用散列函数计算出的对应的位置上
	// };
	
	/**
	 * 分离链接法
	 * @param key
	 * @returns {undefined|*}
	 */
	// this.put = function (key, value) {
	// 	var position = djb2HashCode(key);
	// 	if (table[position] == undefined) {
	// 		table[position] = new LinkedList();
	// 	}
	//
	// 	table[position].append(new valuePair(key, value));
	// };
	
	// this.get = function (key) {
	// 	return table[djb2HashCode(key)];
	// };
	
	/**
	 * 线性探查法
	 * @param key
	 * @param value
	 */
	this.put = function (key, value) {
		var position = djb2HashCode(key);
		
		if (table[position] == undefined) {
			table[position] = new valuePair(key, value);
		} else {
			var index = ++position;
			while (table[index] != undefined) {
				index++;
			}
			table[index] = new valuePair(key, value);
		}
	};
	
	/**
	 * 分离链接法
	 * @param key
	 * @returns {boolean}
	 */
	// this.get = function (key) {
	// 	var position = djb2HashCode(key);
	//
	// 	if ( table[position] !== undefined ) {
	//
	// 		var current = table[position].getHeader(); // ?
	//
	// 		while (current.next) {
	// 			if (current.element.key === key) {
	// 				return current.element.value;
	// 			}
	// 			current = current.next;
	// 		}
	//
	// 		if (current.element.key === key) {
	// 			return current.element.value;
	// 		}
	// 	}
	// 	return undefined;
	// };
	
	/**
	 * 线性探查法
	 * @param key
	 * @returns {undefined|*}
	 */
	this.get = function (key) {
		var position = djb2HashCode(key);
		
		if (table[position] !== undefined) {
			if (table[position].key === key) {
				return table[position].value;
			} else {
				var index = ++position;
				while (table[index] === undefined || table[index].key !== key) {
					index++;
				}
				if (table[index].key !== key) {
					return table[index].value;
				}
			}
		}
		return undefined;
	};
	
	// this.remove = function (key) {
	// 	table[djb2HashCode(key)] = undefined;
	// };
	
	this.remove = function (key) {
		var position = djb2HashCode(key);
		
		if (table[position] !== undefined) {
			var current = table[position].getHeader();
			while (current.next) {
				if (current.element.key === key) {
					table[position].remove(current.element);
					if (table[position].isEmpty()) {
						table[position] = undefined;
					}
					return true;
 				}
				current = current.next;
			}
			
			if (current.element.key === key) {
				table[position].remove(current.element);
				if (table[position].isEmpty()) {
					table[position] = undefined;
				}
				return true;
			}
		}
		return false;
	};
	
	this.print = function () {
		for (var i = 0; i < table.length; i++) {
			if (table[i] !== undefined) {
				console.log(i + ": " + table[i]);
			}
		}
	};
}

var djb2HashCode = function (key) {
	var hash = 5381;
	for (var i = 0; i < key.length; i++) {
		hash = hash * 33 + key.charCodeAt(i); // 返回字符的ASCII值并求和
	}
	return hash % 1013;
};

var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.print();
/**
 * 解决散列值重复问题
 * 1.分离链接法: 为散列表的每一个位置创建一个链表并将元素存储在里面.需要额外的存储空间
 * 2.线性探查法: 当想向表中某个位置加入一个新元素的时候,如果索引为index的位置已经被占据了
 * 就尝试index+1的位置,以此类推
 */



