function ArrayList() {
	var array = [];
	
	this.insert = function (item) {
		array.push(item);
	};
	
	this.toString = function () {
		return array.join();
	};
	
	this.bubbleSort = function () {
		var length = array.length;
		for (var i = 0; i < length; i++) {
			for (var j = 0; j < length - 1 - i; j++) {
				if (array[j] > array[i]) {
					[array[i],array[j]] = [array[j], array[i]];
				}
			}
		}
	};
	
	this.selectionSort = function () {
		var length = array.length,
			indexMin;
		for (var i = 0; i < length; i++) {
			indexMin = i;
			for (var j = i; j < length; j++) {
				if (array[indexMin] > array[j]) {
					indexMin = j;
				}
			}
			if (i !== indexMin) {
				[array[i],array[indexMin]] = [array[indexMin], array[i]];
			}
		}
	};
	
	this.insertionSort = function () {
		var length = array.length,
			j, temp;
		for (var i = 0; i < length; i++) {
			j  = i;
			temp = array[i];
			while (j > 0 && array[j - 1] > temp) {
				array[j] = array[j-1];
				j--;
			}
			array[j] = temp;
		}
	};
	
	this.mergeSort = function () {
		array = mergeSortRec(array);
	};
	
	this.quickSort = function () {
		quick(array, 0, array.length - 1);
	};
	
	this.heapSort = function () {
		var heapSize = array.length;
		buildHeap(array);
		
		while (heapSize > 1) {
			heapSize--;
			swap(array, 0, heapSize);
			heapify(array, heapSize, 0);
		}
	};
}

var buildHeap = function (array) {
	var heapSize = array.length;
	for (var i = Math.floor(array.length / 2); i >= 0 ; i--) {
		heapify(array, heapSize, i);
	}
};
var heapify = function (array, heapSize, i) {
	var left = i * 2 + 1,
		right = i * 2 + 2,
		largest = i;
	
	if (left < heapSize && array[right] > array[largest]) {
		largest = left;
	}
	
	if (right < heapSize && array[right] > array[largest]) {
		largest = right;
	}
	
	if (largest !== i) {
		swap(array, i, largest);
		heapify(array, heapSize, largest);
	}
};

var mergeSortRec = function (array) {
	var length = array.length;
	if (length === 1) {
		return array;
	}
	var mid = Math.floor(length / 2),
		left = array.slice(0, mid),
		right = array.slice(mid, length);
	
	return merge(mergeSortRec(left), mergeSortRec(right));
};

var merge = function (left, right) {
	var result = [],
		il = 0,
		ir = 0;
	while (il < left.length && ir < right.length) {
		if (left[il] < right[ir]) {
			result.push(left[il++]);
		} else {
			result.push(right[ir++]);
		}
	}
	
	while (il < left.length) {
		result.push(left[il++]);
	}
	
	while (ir < right.length) {
		result.push(right[ir++]);
	}
	
	return result;
};

var quick = function (array, left, right) {
	var index;
	if (array.length > 1) {
		index = partition(array, left, right);
		
		if (left < index -1) {
			quick(array, left, index -1);
		}
		
		if (index < right) {
			quick(array, index, right);
		}
	}
};

var partition = function (array, left, right) {
	var pivot = array[Math.floor((right + left) / 2)],
		i = left,
		j = right;
	
	while (i <= j) {
		while (array[i] < pivot) {
			i++;
		}
		
		while (array[j] > pivot) {
			j--;
		}
		
		if (i <= j) {
			[array[i], array[j]] = [array[j], array[i]];
			i++;
			j--;
		}
	}
	return i;
};

function createNonSortedArray(size) {
	var array = new ArrayList();
	for (var i = size; i > 0; i--) {
		array.insert(i);
	}
	return array
}

var swap = function (array, index1, index2) {
	[array[index1], array[index2]] = [array[index2], array[index1]];
};

var array = createNonSortedArray(20);
console.log(array.toString());
array.heapSort();
console.log(array.toString());

function Child() {
	return  new Parent();
}

function Parent() {
	this.a = 1
}
const c = new Child();
Child.prototype = new Parent();
// console.log(c.a);

let arrO = [{a:1},{a:2},{a:1},{a:2},{a:3}];
let result = [];
for (let i = 0; i < arrO.length; i++) {
	for (let j = 0; j < arrO.length - 1; j++) {
		for (let a in arrO[i]) {
			if (arrO[i]["a"] == arrO[j]["a"]) {
				result.push(arrO[i]);
			}
		}
	}
}

console.log(result);

