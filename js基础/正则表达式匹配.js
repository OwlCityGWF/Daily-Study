/**
 * 题目描述
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 说明:
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 */
//示例
// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。
//
// 输入:
// s = "aa"
// p = "a*"
// 输出: true
// 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
//
// 输入:
// s = "ab"
// p = ".*"
// 输出: true
// 解释: "." 表示可匹配零个或多个（''）任意字符（'.'）。
//
// 输入:
// s = "aab"
// p = "cab"
// 输出: true
// 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
//
// 输入:
// s = "mississippi"
// p = "misisp*."
// 输出: false
/**
 * 1)p的下一个字符是*
 * 若s和p的当前字符相同或者p的当前字符为.,则结果取决于:
 * isMatch(s.slice(1), p) || isMatch(s.slice(1), p.slice(2)) || isMAtch(s,p.slice(2));
 * 若p的最后两个字符为.*，就返回true
 * 若不符合上面两种情况就取决于
 * isMatch(s,p.slice(2))
 * ②p的下一个字符不为*
 * 这种情况就简单了
 * 若s和p的当前字符相同或者p的当前字符为.，返回true
 * 否则返回false
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch = function (s, p) {
	if (s.length === 0 && p.length === 0) {
		return true;
	}
	if (s.length !== 0 && p.length === 0) {
		return false;
	}
	
	let str = s[0], pattern = p[0];
	let isNextStart = p[1] === "*";
	
	if (isNextStart) {
		if (str && (str === pattern || pattern === ".")) {
			return isMatch(s.slice(1), p) || isMatch(s.slice(1), p.slice(2)) || isMatch(s, p.slice(2));
		} else if (pattern === "." && p.slice(2).length === 0) {
			return true;
		} else {
			if (str && (str === pattern || pattern === ".")) {
				return isMatch(s.slice(1), p.slice(1))
			} else {
				return false;
			}
		}
	}
};

console.log(isMatch("aa", "a*"));

/**
 * 给定一个只包括'(',')','{','}','[',']'的字符串,判断字符串是否有效
 * 有效字符串需满足:
 * 1.左括号必须用相同类型的右括号闭合.
 * 2.左括号必须以正确的顺序闭合
 * z注意：空字符串可被认为是有效字符串
 * 思路：遇到左括号进行入栈,遇到右括号判断栈顶元素是否与当前字符匹配
 * 如果匹配则出栈，否则返回false，最后检查栈是否为空，如果为空说明完全匹配,返回true，否则返回false。
 */

let isValid = function (s) {
	let rightSymbols = [];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(") {
			rightSymbols.push(")");
		} else if (s[i] === "{") {
			rightSymbols.push("}");
		} else if (s[i] === "[") {
			rightSymbols.push("]");
		} else if (rightSymbols.pop() !== s[i]) {
			return false;
		}
	}
	return !rightSymbols.length;
};

let result = isValid("[{[]}");
console.log(result);

/**
 * 给定一个字符串,找出不含有重复字符的最长子串的长度
 */
let lenOfLongestSubString = function (s) {
	let last = -1;
	let map = {};
	let max = 0;
	for (let i = 0; i < s.length; i++) {
		if (map[s[i]] >= 0 && last < map[s[i]]) {
			last = map[s[i]];
		}
		max = (i - last) > max ? i - last : max;
		map[s[i]] = i;
	}
	return max;
};

let resultTwo = lenOfLongestSubString('abcabcabcabcd');
console.log(resultTwo);

/**
 * 寻找两个有序数组的中位数
 * 给定两个大小为m和n的有序数组nums1和nums2
 * 找出这两个有序数组的中位数，并且要求算法的时间复杂度为O(long(m+n));
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let findMedianSortedArrays = function (nums1, nums2) {
	let arr = nums1.concat(nums2);  // 数组拼接
	arr = arr.sort((a, b) => {
		return a - b
	}); // 数组排序
	const len = arr.length;
	const index = parseInt(len / 2); // 计算中间位置 index （如果是 偶数长度，则 index 并非中间）
	if (len % 2 !== 0) {
		return arr[index].toFixed(1); // 如果是非偶数，直接返回中间即可（注意输出是 1.0）
	} else {
		return ((arr[index - 1] + arr[index]) / 2).toFixed(1);  // 偶数需要计算求平均值同时保留1位小数点
	}
};

console.log(findMedianSortedArrays([1, 2], [3, 4]));

/**
 * 1.setTimeout
 */
// console.log('script start');
// setTimeout(() =>{
	// console.log('settimeout');
// });
// console.log('script end');
//script start scriot end settimeout

/**
 * 2.Promise
 * 本身是同步的立即执行函数,当在executor中执行resolve或者reject的时候，此时是异步操作，会先执行then/catch等，当主栈完成后才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果,一个Promise实现.
 */
// console.log('script start');
// let promise1 = new Promise(function (resolve) {
	// console.log('promise1');
	// resolve();
	// console.log('promise1 end');
// }).then(function () {
	// console.log('promise2')
// });

// setTimeout(function () {
	// console.log('settimeout');
// });

// console.log('script end');
/**
 * 当JS主线程执行到Promise对象时
 * 1.promise1.then()的回调就是一个task
 * 2.promise1是resolve或rejected;那这个task就会放入当前事件循环回合的microtask queue
 * 3.promise1是pending:这个task就会放入事件循环的未来的某个(可能下一个)回合的microtask queue中
 * 4.setTimeout的回调也是个task，它会被放入macrotask queue即使是Oms情况
 * promise.then()的task永远是microTask,而setTimeout的task是macroTask,microTask优先macroTask执行.
 */

/**
 * 3.async/await
//  */
// async function async1() {
// 	console.log('async1 start');
// 	await async2();
// 	console.log('async1 end');
// }
//
// async function async2() {
// 	console.log('async2')
// }
//
// console.log('script start');
// async1();
// console.log('script end');
//script start->async1 start->async2->script end->async1 end
/**
 * async函数返回一个Promise对象,当函数执行的时候,一🥚遇到await就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句.可以理解为，是让出了线程,跳出了async函数体.
 */
// async function func1() {
// 	return 1
// }
//
// func1().then(res =>{
// 	console.log(res);
// });
/**
 * await的含义为等待,也就是async函数需要等待await后的函数执行完成并且有了返回结果(Promise对象)之后,才能继续执行下面的代码.await通过返回一个Promise对象来实现同步的效果.
 */
/**
 * Async/Await如何通过同步的方式实现异步
 * 1.callback
 * $.ajax({
 *     url: 'http://xxx',
 *     success: function(res) {
 *         console.log(res);
 *     }
 * });
 * success作为函数传递过去并不会立即执行，而是等待请求成功了才执行，即回调函数.
 * const fs = require('fs');
 * fs.rename('旧文件.txt','新文件.txt'， err=>{
 *     if (err) throw err;
 *     console.log('重命名完成');
 * });
 * 和网络请求类似,等到IO操作有了结果(无论成功与否)才会执行第三个参数:（err）=> {}
 * async/await是参照Generator封装到一套异步处理方案,可以理解为Generator的语法糖,而Generator又依赖于迭代器Iterator,而Iterator的来源于单向链表.
//
// run(function* () {
// 	const res1 = yield readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
// 	console.log(res1);
// 	const res2 = yield readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
// 	console.log(res2);
// });
//
// const readFile = async ()=>{
// 	const res1 = await readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
// 	console.log(res1);
// 	const res2 = await readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
// 	console.log(res2);
// 	return 'done';
// };
//
// const res = readFile();
/**
 * 1.当await后面跟的是Promise对象时,才会异步执行,其他类型的数据会同步执行
 * 2.
//  */
// async function async1() {
// 	console.log('async1 start');
// 	await async2();
// 	console.log('async1 end');
// }
//
// async function async2() {
// 	console.log('async2');
// }
//
// console.log('script start');
// setTimeout(function () {
// 	console.log('setTimeout');
// },0);
//
// async1();
//
// new Promise(function (resolve) {
// 	console.log('promise1');
// }).then(function () {
// 	console.log('promise2');
// });
//
// console.log('script end');
//
// console.log('1');
//
// setTimeout(function() {
// 	console.log('2');
// 	process.nextTick(function() {
// 		console.log('3');
// 	});
// 	new Promise(function(resolve) {
// 		console.log('4');
// 		resolve();
// 	}).then(function() {
// 		console.log('5')
// 	})
// });
// process.nextTick(function() {
// 	console.log('6');
// });
// new Promise(function(resolve) {
// 	console.log('7');
// 	resolve();
// }).then(function() {
// 	console.log('8')
// });
//
// setTimeout(function() {
// 	console.log('9');
// 	process.nextTick(function() {
// 		console.log('10');
// 	});
// 	new Promise(function(resolve) {
// 		console.log('11');
// 		resolve();
// 	}).then(function() {
// 		console.log('12')
// 	})
// });

/**
 * 第一轮宏任务执行，遇到微任务，将微任务放入微任务队列。直到第一轮宏任务执行完成后，
 * 执行微任务队列中的所有微任务，再执行第二轮宏任务.
 * @returns {Promise<void>}
 */
// async function async1() {
// 	console.log('async1 start');
// 	await async2();
// 	console.log('async1 end'); //微任务
// }
//
// async function async2() {
// 	new Promise(function (resolve) {
// 		console.log('promise1');
// 		resolve();
// 	}).then(function () {
// 		console.log('promise2'); //.then()只有resolve之后才可执行微任务
// 	})
// }
//
// console.log('script start');
//
// setTimeout(function () {
// 	console.log('setTimeout')
// },0);
//
// async1();
//
// new Promise(function (resolve) {
// 	console.log('promise3');
// 	resolve();
// }).then(function () {
// 	console.log('promise4'); //微任务
// });
//
// console.log('script end');

//变式二
// async function async3() {
// 	console.log('async1 start');
// 	await async4();
// 	setTimeout(function () {
// 		console.log('setTimeout1');
// 	},0)
// }
//
// async function async4() {
// 	setTimeout(function () {
// 		console.log('setTimeout2')
// 	},0)
// }
//
// console.log('script start');
//
// setTimeout(function () {
// 	console.log('setTimeout3')
// },0);
//
// async3();
//
// new Promise(function (resolve) {
// 	console.log('promise1');
// 	resolve();
// }).then(function () {
// 	console.log('promise2');
// });
//
// console.log('script end');

//变式三
async function a1() {
	console.log('a1 start');
	await a2();
	console.log('a1 end');
}

async function a2() {
	console.log('a2')
}

console.log('script start');

setTimeout(()=>{
	console.log('setTimeout')
},0);

Promise.resolve().then(()=>{
	console.log('promise1')
});

a1();

let promise2 = new Promise((resolve => {
	resolve('promise2.then');
	console.log('promise2');
}));

promise2.then(res=>{
	console.log(res);
	Promise.resolve().then(()=>{
		console.log('promise3');
	})
});

console.log('script end');


