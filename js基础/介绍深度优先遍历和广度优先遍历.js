/**
 * 深度优先遍历DFS
 * 假设初始状态时图中所有顶点均未被访问,则从某个顶点v出发,首先访问该顶点然后依次从它的
 * 各个未被访问的领接点出发深度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到。
 * 若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程,直至图中所有顶点都被访问到为止.
 */
/**
 * 深度优先遍历三种方式
 */
let deepTraversal1 = (node, nodeList = []) => {
	if (node !== null) {
		nodeList.push(node);
		let children = node.children;
		for (let i = 0; i < children.length; i++) {
			deepTraversal1(children[i], nodeList)
		}
	}
	return nodeList;
};

let deepTraversal2 = (node) => {
	let nodes = [];
	if (node !== []) {
		nodes.push(node);
		let children = node.children;
		for (let i = 0; i < children.length; i++) {
			nodes = nodes.concat(deepTraversal2(children[i]));
		}
	}
	return nodes;
};

//非递归
let deepTraversal3 = (node) => {
	let stack = [];
	let nodes = [];
	if (node) {
		stack.push(node);
		while (stack.length) {
			let item = stack.pop();
			let children = item.children;
			nodes.push(item);
			for (let i = children.length - 1; i >= 0; i--) {
				stack.push(children[i]);
			}
		}
	}
	return nodes;
};

/**
 * 广度优先遍历BFS
 * 从图中某顶点v出发,在访问了v之后依次访问v的各个未曾访问过的领接点,然后分别从
 * 这些邻接点出发依次访问它们的邻接点,并使得"先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，
 * 直至图中所有已被访问的顶点的邻接点都被访问到.如果此时图中尚有顶点未被访问，则需要另选一个未曾访问过的顶点作为新的起点，
 * 重复上述过程，直至图中所有顶点都被访问到为止"
 */
let widthTraversal2 = (node) => {
	let nodes = [];
	let stack = [];
	if (node) {
		stack.push(node);
		while (stack.length) {
			let item = stack.shift();
			let children = item.children;
			nodes.push(item);
			for (let i = 0; i < children.length; i++) {
				stack.push(children[i]);
			}
		}
	}
	return nodes;
};

