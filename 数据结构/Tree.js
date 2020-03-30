function BinarySearchTree() {
	
	// 表示树中的每一个节点
	var Node = function (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	};
	
	// 表示元素
	var root = null;
	
	this.insert = function (key) {
		
		var newNode = new Node(key); // 创建用来表示新节点的Node类实例
		
		if (root === null) { // 验证这个插入操作是否为一种特殊情况.我们要插入的节点是树的
			// 第一个节点，如果是，就将根节点指向新节点
			root = newNode;
		} else {
			insertNode(root, newNode); // 将节点加在非根节点的其他位置。由辅助函数insertNode()来实现.
		}
	};
	
	/**
	 * 中序遍历: 从最小到最大的顺序访问所有节点。
	 * 左->中->右
	 * 首先要检查以参数形式传入的节点是否为null,(停止递归的判断条件)
	 * 然后，递归调用相同的函数来访问左侧子节点。接着对这个节点进行一些操作，然后再访问右侧子节点
	 */
	this.inOrderTraverse = function (callback) {
		inOrderTraverseNode(root, callback);
	};
	
	/**
	 * 先序遍历: 优先于后代节点的顺序访问每个节点.应用是打印一个结构化文档
	 * 中->左->右
	 * 先访问节点本身,然后再访问它的左侧子节点,最后是右侧子节点
	 */
	this.preOrderTraverse = function (callback) {
		preOrderTraverseNode(root, callback);
	};
	
	/**
	 * 后序遍历是先访问节点的后代节点,再访问节点本身.
	 * 左->右->中
	 * 应用:计算一个目录和它的子目录中所有文件所占空间的大小
	 */
	this.postOrderTraverse = function (callback) {
		postOrderTraverseNode(root, callback);
	};
	
	this.min = function () {
		return minNode(root);
	};
	
	this.max = function () {
		return maxNode(root);
	};
	
	this.search = function (key) {
		return searchNode(root, key);
	};
	
	this.remove = function (key) {
		root = removeNode(root, key);
	};
}

var insertNode = function (node, newNode) {
	if (newNode.key < node.key) {
		if (node.left === null) {
			node.left =  newNode;
		} else {
			insertNode(node.left, newNode);
		}
	} else {
		if (node.right === null) {
			node.right = newNode;
		} else {
			insertNode(node.right, newNode);
		}
	}
};

// var insertNode = function (node, newNode) {
// 	if (newNode.key < node.key) {
// 		// 如果新节点的键小于当前节点的键,那么需要检查当前节点的
// 		// 左侧子节点。如果它没有左侧子节点,就在那里插入新的节点.
// 		// 如果由左侧子节点.需要通过递归insertNode()方法继续找到树的下一层。
// 		// 下次将要比较的节点会是当前节点的左侧子节点。
// 		if (node.left === null) {
// 			node.left = newNode;
// 		} else {
// 			insertNode(node.left, newNode);
// 		}
// 	} else {
// 		if (node.right === null) { 		// 如果节点的键比当前节点的键大,同时当前节点没有右侧子节点,就在那里插入新的节点。
// 			node.right = newNode;
// 		} else {
// 			// 如果有右侧子节点，同样需要递归调用insertNode方法，
// 			// 但是要用来和新节点比较的节点将会是右侧子节点
// 			insertNode(node.right, newNode);
// 		}
// 	}
// };

var inOrderTraverseNode = function (node, callback) {
	if (node !== null) {
		inOrderTraverseNode(node.left, callback);
		callback(node.key);
		inOrderTraverseNode(node.right, callback);
	}
};

var preOrderTraverseNode = function (node, callback) {
	if (node !== null) {
		callback(node.key);
		preOrderTraverseNode(node.left, callback);
		preOrderTraverseNode(node.right, callback);
	}
};

var postOrderTraverseNode = function (node, callback) {
	if (node !== null) {
		postOrderTraverseNode(node.left, callback);
		postOrderTraverseNode(node.right, callback);
		callback(node.key);
	}
};

/**
 * 搜索树中的值
 * 最小值: 沿着树的左边遍历
 * 最大值: 沿着树的右边遍历
 * 搜索特定的值:
 */
var minNode = function (node) {
	if (node) {
		while (node && node.left !== null) {
			node = node.left;
		}
		
		return node.key;
	}
	return null;
};

var maxNode = function (node) {
	if (node) {
		while (node && node.right !== null) {
			node = node.right;
		}
		
		return node.key;
	}
	
	return null;
};

var searchNode = function (node, key) {
	
	if (node === null) {
		return false;
	}
	if (key < node.key) {
		return searchNode(node.left, key);
	} else if (key > node.key) {
		return searchNode(node.right, key);
	} else {
		return true;
	}
};

var removeNode = function (node, key) {
	if (node === null) {
		return null;
	}
	
	if (key < node.key) {
		node.left = removeNode(node.left, key);
		return node;
	} else if (key > node.key) {
		node.right = removeNode(node.right, node);
		return node;
	} else { // 键等于node.key
		// 第一种情况: 一个叶节点
		if (node.left === null && node.right === null) {
			node = null; // 给节点赋予null值来移除它
			return node; // 返回null来将对应的父节点指针赋予null值
		}
		
		// 第二种情况: 一个只有一个子节点的节点
		// 这种情况下,需要跳过这个节点，直接将父节点指向它的指针指向子节点
		/**
		 * 如果这个节点没有左侧子节点，也就是说它有一个右侧子节点。因此我们把对它
		 * 的引用改为对它右侧子节点的引用并返回更新后的节点。
		 * 如果这个节点没有右侧子节点，也是一样，把对它的引用改为对它
		 * 左侧子节点的引用,并返回更新后的值
		 */
		if (node.left === null) {
			node = node.right;
			return node;
		} else if (node.right === null) {
			node = node.left;
			return node;
		}
		
		// 第三种情况: 一个有两个子节点的节点
		/**
		 * (1) 当找到了需要移除的节点后，需要找到它右边子树中最小的节点
		 * (2) 然后,用它右侧子树中最小节点的键去更新这个节点的值。通过这
		 * 一步，我们改变了这个节点的键，也就是说它被移除了。
		 * (3). 但是,这样在树中就有两个拥有相同键的节点了，这是不行的.要继续把右侧子树中的
		 * 最小节点移除,毕竟它已经被移至要移除的节点的位置了。
		 * (4). 最后,向它的父节点返回更新后节点的引用。
		 */
		var aux = findMinNode(node.right);
		node.key = aux.key;
		node.right = removeNode(node.right, aux.key);
		return node;
	}
};

/**
 * AVL树:是一种自平衡二叉搜索树,意思是任何一个节点左右两侧子树的高度之差最多为1。
 * 这种树在添加或移除节点时尽量试着成为一颗完全树。
 */



