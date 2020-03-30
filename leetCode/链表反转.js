let array = [1, 2, 3, 4, 5];
array.reverse();
for (let i = 0; i < array.length / 2; i++) {
	[array[i], array[array.length - i - 1]] = [array[array.length - i - 1], array[i]]
}
console.log(array);

function Node(val) {
	this.val = val;
	this.next = null;
}

function List(array) {
	this.head = null;
	let i = 0, temp = null;
	while (i < array.length) {
		if (i === 0) {
			this.head = new Node(array[i]);
			temp = this.head;
		} else {
			let newNode = new Node(array[i]);
			temp.next = newNode;
			temp = temp.next;
		}
		i++;
	}
}

function traverseList(listHead) {
	while (listHead) {
		console.log(listHead.val);
		listHead = listHead.next;
	}
}

function reverse(list) {
	var p = list.head, q = null;
	while (p.next !== null) {
		q = p.next;
		p.next = q.next;
		q.next = list.head.next;
		list.head.next = q;
	}
	return list;
}


