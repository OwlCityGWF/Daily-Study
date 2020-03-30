function Otaku(name, age) {
	this.name = name;
	this.age = age;
	
	this.habit = 'Games';
}

function objectFactory() {
	var obj = new Object(),
		Constructor = [].shift.call(arguments);
	obj.__proto__ = Constructor.prototype;
	var ret = Constructor.apply(obj, arguments);
	return typeof ret === 'object' ? ret : obj;
}

function create() {
	var obj = new Object(),
		Con = [].shift.call(arguments);
	Object.setPrototypeOf(obj, Con.prototype);
	var ret = Con.apply(obj, arguments);
	return ret instanceof Object ? ret : obj;
}

var person = create(Otaku, 'Kevin', '18');
console.log("create:", person);

class LinkNode {
	constructor(element, next) {
		this.element = element;
		this.next = next;
	}
}

const makeIterator = arr => {
	let nextIndex = 0;
	return {
		next: () =>
			nextIndex < arr.length
				? {value: arr[nextIndex++], done: false}
				: {value: undefined, done: true}
	};
};

const it = makeIterator(['人月','神话']);
console.log(it.next());
console.log(it.next());
console.log(it.next());

const myIterable = {};
myIterable[Symbol.iterator] = function* () {
	yield 1;
	yield 2;
	yield 3;
};

for (let value of myIterable) {
	console.log(value);
}

console.log([...myIterable]);

function* another() {
	yield '人月神话';
}

function* gen() {
	yield* another();
	const a = yield 'hello';
	const b = yield a;
	yield b;
}

const g = gen();
g.next();
g.next();
g.next('world');
g.next('!');
g.next();
console.log(g.next());

/**
 * filter方法创建一个新数组，其中包含通过提供函数实现的测试
 * 的所有元素，原始数组不会改变。传给callback接受三个参数
 * 分别是currentValue, index(可选),array(可选)。
 * 还接收this值(可选),用于执行callback函数时使用的this值.
 * @type {number[]}
 */
const arr1 = [1, 2, 1, 2, 3, 4, 5, 4, 5, 3, 4, 4, 4];
const arr2 = arr1.filter((element, index, self) => {
	return self.indexOf( element ) === index;
});

const arr3 = [];
for (let i = 0; i < arr1.length; i++) {
	if (arr1.indexOf(arr1[i]) === i) {
		arr3.push(arr1[i]);
	}
}
console.log(arr3);
console.log(arr2);

/**
 * Array.prototype.reduce
 * reduce()方法对数组中的每个元素执行一个提供的reducer函数
 * 将其结果汇总为单个返回值。传递给reduce的回调函数接受四个参数
 * 分别是累加器accumulator,currentValue,currentIndex(可选)
 * array(可选),除了callback之外还可以接受初始值initValue值(可选)
 * 1.如果没有提供initValue，那么第一次调用callback函数时,accumulator使用
 * 愿数组中的第一个元素,currentValue即是数组中的第二个元素。在没有初始值
 * 的空数组上调用reduce将报错.
 * 2.如果提供了initValue,那么将作为第一次调用callback函数时
 * 的第一个参数的值,即accumulator，currentValue使用原数组中的第一个
 * 元素.
 */

// 无initialValue
const arr = [0, 1, 2, 3, 4];
let sum = arr.reduce((accumulator, currentValue, currentIndex, array) => {
	return accumulator + currentValue
});

// 有initialValue
let sum2 = arr.reduce((accumulator, currentValue, currentIndex, array) => {
	return accumulator + currentValue
}, 10);

console.log(sum);
console.log(sum2);

let isType = type => obj => {
	return Object.prototype.toString.call( obj )
	 === '[object ' + type + ']';
};

console.log(isType('String')('123'));

/**
 * js实现无限累加函数
 */
function add(a) {
	function sum(b) {
		a = a + b;
		return sum;
	}
	sum.toString = function () {
		return a;
	};
	return sum;
}
let test = add(1)(2)(3)(4);
console.log(test);

let flatArr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

let result = Array.from(new Set(flatArr.flat(4))).sort((a, b) => {
	return a - b;
});

console.log(result);

/**
 * curring是一种将使用多个参数的函数转换成一系列使用一个参数的函数
 * 并且返回接受余下的参数而且返回结果的新函数的技术.
 * 只传给函数一部分参数来调用它，让它返回一个新函数去处理剩下的参数。
 */

const addTest = (...args) => args.reduce((a, b) => a + b);

console.log(addTest(1, 2));

/**
 * 实际应用
 * 1.延迟计算
 */
function currying(func) {
	const args = [];
	return function result(...rest) {
		if (rest.length === 0) {
			return func(...args);
		} else {
			args.push(...rest);
			return result;
		}
	}
}

const sumTest = currying(addTest);
let oneSum = sumTest(1,2)(3);
let two = sumTest(4);
let there = sumTest();
console.log(there);

/**
 * bind模拟实现
 */
Function.prototype.bind = function (context) {
	var self = this;
	var args = Array.prototype.slice.call(arguments,1);
	return function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply(context, args.concat(bindArgs));
	}
};

/**
 * 2.动态创建函数
 * 第一次判断之后,动态创建一个新函数用于处理后续传入的参数
 * 并返回这个新函数
 */
// const addEvent = (function () {
// 	if (window.addEventListener) {
// 		return function (type, el, fn, capture) {
// 			el.addEventListener(type, fn, capture);
// 		}
// 	}
// 	else if (window.attachEvent) {
// 		return function (type, el, fn) {
// 			el.attachEvent('on' + type, fn);
// 		}
// 	}
// })();

/**
 * 3.参数复用
 * 调用toString()方法可以获取每个对象的类型，但是不同对象的
 * toString有不同的实现,所以要通过Object.prototype.toString()
 * 来获取Object上的实现,同时以call()/apply()的形式来调用，并传递要
 * 检查的对象作为第一个参数
 */
const toStr = Function.prototype.call.bind(Object.prototype.toString);
let testt = toStr([1, 2, 3]);
console.log(testt);

/**
 * 实现currying
 * 封装一系列的处理步骤，通过闭包将参数集中起来计算，最后再把需要处理
 * 的参数传进去。
 * 实现原理就是:用闭包把传入的参数保存起来，当传入参数的数量
 * 足够执行函数时，就开始执行函数
 */
function curryingTwo(fn, length) {
	// 第一次调用获取函数fn参数的长度，后续调用获取fn剩余参数的长度
	length = length || fn.length;
	// 返回一个新函数,接收参数为...args
	return function (...args) {
		// 新函数接收的参数长度是否大于等于fn剩余参数需要接收的长度
		return args.length >= length ?
			// 满足要求，执行fn函数，传入新函数的参数
			fn.apply(this, args)
			// 不满足要求,递归curryingTwo函数,新的fn为bing返回的新函数(bing绑定了...args参数,为执行)
			// 新的length为fn剩余参数的长度
			: curryingTwo(fn.bind(this, ...args), length - args.length)
	}
}

const fn = curryingTwo(function (a, b, c) {
	console.log(a, b, c);
});

// fn("a","b","c");
fn("a","b")("c");

// ES6写法
const es6Currying = fn =>
	judge = (...args) =>
		args.length >= fn.length
		? fn(...args)
			: (...arg) => judge(...args, ...arg);
const es6Fn = es6Currying(function (a,b,c) {
	console.log([a,b,c]);
});

es6Fn("a","b","c");
es6Fn("a","b")("c");

let str = "123456";
let sn = parseInt(str);
console.log(sn);
let res = [];
for (let i = 0; i < str.length; i++) {
	console.log(str[i]);
	res.push(str[i]);
}

console.log(res);

function f1(){
	
	var n=999;
	
	nAdd=function(){n+=1};
	
	function f2(){
		console.log(n);
	}
	
	return f2;
	
}

var ress = f1();

ress();

nAdd();

ress();


// var name = "The Window";
//
// var object = {
// 	name : "My Object",
//
// 	getNameFunc : function(){
// 		return function(){
// 			return this.name;
// 		};
//
// 	}
//
// };
//
// console.log(object.getNameFunc()());

var name = "The Window";

var object = {
	name : "My Object",
	
	getNameFunc : function(){
		var that = this;
		return function(){
			return that.name;
		};
		
	}
	
};

console.log(object.getNameFunc()());

let w = [2,3,4,5];
let v = [3,4,5,6];
console.log(fun(w,v,9));

function fun(w,v,capacity){
	//初始化表格
	let V = new Array(w.length);
	for(let i = 0;i<w.length;i++){
		for(let j = 0;j<capacity;j++){
			V[j] = Math.max(P(j),P(j-w[i])+v[i] )
		}
	}
	
	//表格超出边界值为0
	function P(i){return V[i] || 0 }
	return V[capacity-1]
}

let jack = 1;
console.log(jack.isPrototypeOf(1));

let strr = "12345";
var x = strr-0;
x = x*1;

console.log(x);
