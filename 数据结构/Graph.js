/**
 * 1.一个顶点的度是其相邻顶点的数量
 * 2.如果图中不存在环,则称该图是无环的。如果图中每两个顶点间都存在路径，
 * 则该图是连通的
 * 3.图可以是无向的(边没有方向)或是有向的(有向图)
 * 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的.
 * 图还可以是未加权或是加权的。
 * 解决的问题: 1.搜索图中的一个特定顶点或搜索一条特定边。2.寻找图中的一条路径(从一个顶点到另一个顶点)
 * 3.寻找两个顶点之间的最短路径
 */
function Dictionary() {
	var items = {};
	this.has = function (key) {
		return key in items;
	};
	
	this.set = function (key, value) {
		items[key] = value;
	};
	
	this.remove = function (key) {
		if (this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	};
	
	this.get = function (key) {
		return this.has(key) ? items[key] : undefined;
	};
	
	this.keys = function () {
		return Object.keys(items);
	};
	
	this.values = function () {
		var values = [];
		for (var k in items) {
			if (this.has(k)) { // 排除从Object类中继承来的属性
				values.push(items[k]);
			}
		}
		return values;
	};
	
	this.getItems = function () {
		return items;
	}
}

function Queue() {
	
	let items = [];
	
	this.enqueue = function (element) {
		items.push(element);
	};
	
	this.dequeue = function () {
		return items.shift();
	};
	
	this.front = function () {
		return items[0]
	};
	
	this.isEmpty = function () {
		return items.length == 0;
	};
	
	this.clear = function () {
		items = [];
	};
	
	this.size = function () {
		return items.length;
	};
	
	this.print = function () {
		console.log(items.toString());
	}
}

function Stack() {
	let items = [];
	
	this.push = function (element) {
		items.push(element);
	};
	
	this.pop = function () {
		return items.pop();
	};
	
	this.peek = function () {
		return items[items.length - 1];
	};
	
	this.isEmpty = function () {
		return items.length === 0;
	};
	
	this.size = function () {
		return items.length;
	};
	
	this.clear = function () {
		items = [];
	};
	
	this.print = function () {
		console.log(items.toString());
	};
}

function Graph() {
	var vertices = [];
	var adjList = new Dictionary(); // 使用字典存储邻接表,使用顶点的名字作为键，邻接顶点列表作为值
	this.addVertex = function (v) {
		vertices.push(v);
		adjList.set(v, [])
	};
	this.addEdge = function (v, w) {
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	};
	
	this.toString = function () {
		var s = '';
		for (var i = 0; i < vertices.length; i++) {
			s += vertices[i] + '->';
			var neighbors = adjList.get(vertices[i]);
			for (var j = 0; j < neighbors.length; j++) {
				s += neighbors[j] + '';
			}
			
			s += '\n';
		}
		
		return s;
	};
	
	var initialzeColor = function () {
		var color = [];
		for (var i = 0; i < vertices.length ; i++) {
			color[vertices[i]] = 'white';
		}
		return color;
	};
	
	/**
	 * 广度优先遍历
	 * @param v
	 * @param callback
	 */
	this.bfs = function (v, callback) {
		var color = initialzeColor(),
			queue = new Queue();
		queue.enqueue(v);
		
		while (!queue.isEmpty()) {
			var u = queue.dequeue(),
				neighbors = adjList.get(u);
			color[u] = 'grey';
			for (var i = 0; i < neighbors.length; i++) {
				var w = neighbors[i];
				if (color[w] === 'white') {
					color[w] = 'grey';
					queue.enqueue(w);
				}
			}
			color[u] = 'black';
			if (callback) {
				callback(u);
			}
		}
	};
	
	/**
	 * 改进版广度优先遍历,引入前溯点数组
	 * @param v
	 * @returns {{distances: *, predecessors: *}}
	 * @constructor
	 */
	this.BFS = function (v) {
		var color = initialzeColor(),
			queue = new Queue(),
			d = [],
			pred = [];
		queue.enqueue(v);

		for (var i = 0; i < vertices.length; i++) {
			d[vertices[i]] = 0;
			pred[vertices[i]] = null;
		}

		while (!queue.isEmpty()) {
			var u = queue.dequeue(),
				neighbors = adjList.get(u);
			color[u] = 'grey';
			for (var i = 0; i < neighbors.length; i++) {
				var w = neighbors[i];
				if (color[w] === 'white') {
					color[w] = 'grey';
					d[w] = d[u] + 1;
					pred[w] = u;
					queue.enqueue(w);
				}
			}
			color[u] = 'black';
		}
		return {
			distances: d,
			predecessors: pred
		};
	}
	
	/**
	 * 深度优先遍历
	 * @param callback
	 */
	this.deepFirst = function (callback) {
		var color = initialzeColor();
		
		for (var i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				dfsVisit(vertices[i], color, callback);
			}
		}
	};
	var dfsVisit = function (u, color, callback) {
		color[u] = 'grey';
		if (callback) {
			callback(u);
		}
		var neighbors = adjList.get(u);
		for (var i = 0; i < neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				dfsVisit(w, color, callback);
			}
		}
		color[u] = 'black';
	};
	
	/**
	 * 改进版深度优先遍历
	 */
	var time = 0;
	this.deepFirstT = function () {
		var color = initialzeColor(),
			d = [],
			f = [],
			p = [];
		time = 0;
		
		for (var i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				DFSVisit(vertices[i], color, d, f, p);
			}
		}
		return {
			discovery: d,
			finished: f,
			predecessors: p
		};
	};
	
	var DFSVisit = function (u, color, d, f, p) {
		console.log('discovered ' + u);
		color[u] = 'grey';
		d[u] = ++time;
		var neighbors = adjList.get(u);
		for (var i = 0; i < neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				p[w] = u;
				DFSVisit(w,color,d,f,p);
			}
		}
		color[u] = 'black';
		f[u] = ++time;
		console.log('explored ' + u);
	}
}

function printNode(value) {
	console.log('Visited vertex: ' + value);
}
var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I'];
for (var i = 0; i < myVertices.length; i++) {
	graph.addVertex(myVertices[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
graph.bfs(myVertices[0], printNode);
console.log(graph.toString());
var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);
var fromVertex = myVertices[0];
for (var i = 0; i < myVertices.length; i++) {
	var toVertex = myVertices[i],
		path = new Stack();
	for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
		path.push(v);
	}
	path.push(fromVertex);
	var s = path.pop();
	while (!path.isEmpty()) {
		s += ' - ' + path.pop();
	}
	console.log(s);
}

graph.deepFirst(printNode);




