/**
 *
 * @constructor
 */
function ArrayList() {
	var array = [];
	
	this.insert = function (item) {
		array.push(item);
	};
	
	this.toString = function () {
		return array.join();
	};
	
	/**
	 * bubbleSort
	 */
	this.bubbleSort = function () {
		var length = array.length;
		for (var i = 0; i < length; i++) {
			for (var j = 0; j < length - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					swap(j, j+1);
				}
			}
		}
	};
	
	/**
	 * selectionSort
	 */
	this.selectionSort = function () {
		var length = array.length,
			indexMin;
		for (var i = 0; i < length - 1; i++) {
			indexMin = i;
			for (var j = 0; j < length; j++) {
				if (array[indexMin] > array[j]) {
					indexMin = j;
				}
			}
			
			if (i !== indexMin) {
				swap(i, indexMin);
			}
		}
	};
	
	/**
	 * insertionSort
	 */
	this.insertionSort = function () {
		var length = array.length,
			j, temp;
		for (let i = 0; i < length; i++) {
			j = i;
			temp = array[i];
			while (j > 0 && array[j - 1] > temp) {
				array[j] = array[j - 1];
				j--;
			}
			array[j] = temp;
		}
	};
	
	/**
	 * mergeSort
	 */
	this.mergeSort = function () {
		array = mergeSortRec(array);
	};
	
	/**
	 * quickSort
	 * 使用分治的方法，将原始数组分为较小的数组
	 * 1).首先，从数组中选择中间一项作为主元
	 * 2).创建两个指针，左边一个指向数组第一个项,右边一个指向数组最后一个项
	 * 移动左指针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元
	 * 小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比
	 * 主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分操作
	 * 3).接着,对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成的子数组)
	 * 重复之前的两个步骤，直至数组已完成排序.
	 */
	this.quickSort = function () {
		quick(array, 0, array.length - 1);
	};
	
	/**
	 * 顺序搜索
	 */
	this.sequentialSearch = function (item) {
		for (var i = 0; i < array.length; i++) {
			if (item === array[i]) {
				return i;
			}
		}
		return -1;
	};
	
	/**
	 * 二分搜索
	 */
	this.binarySearch = function (item) {
		this.quickSort();
		
		var low = 0,
			high = array.length - 1,
			mid, element;
		
		while (low <= high) {
			mid = Math.floor((low + high) / 2);
			element = array[mid];
			if (element < item) {
				low = mid + 1;
			} else if (element > item) {
				high = mid - 1;
			} else {
				return mid;
			}
		}
		return -1;
	};
}

var quick = function (array, left, right) {
	var index;
	if (array.length > 1) {
		index = partition(array, left, right);
		if (left < index - 1) {
			quick(array, left, index - 1);
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
			swapQuickSort(array, i, j);
			i++;
			j--;
		}
	}
	return i;
};

var swapQuickSort = function (array, index1, index2) {
	var aux = array[index1];
	array[index1] = array[index2];
	array[index2] = aux;
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

var swap = function (index1, index2) {
	[array[index1],array[index2]] = [array[index2], array[index1]];
};

function createSortedArray(size) {
	var array = new ArrayList();
	for (var i = size; i > 0; i--) {
		array.insert(i);
	}
	return array;
}

var array = createSortedArray(5);
// array.bubbleSort();
// array.selectionSort();
// array.insertionSort();
// array.mergeSort();
array.quickSort();
console.log(array.toString());
console.log(array.sequentialSearch(5));

// var i = 0;
// function recursiveFn () {
// 	i++;
// 	recursiveFn();
// }
// try {
// 	recursiveFn();
// } catch (ex) {
// 	console.log(('i = ' + i + ' error: ' + ex))
// }


