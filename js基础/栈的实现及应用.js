/**
 * Stack类实现
 * @constructor
 */
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
		return items.length == 0;
	};
	
	this.size = function () {
		return items.length;
	};
	
	this.clear = function () {
		items = [];
	};
	
	this.print = function () {
		console.log(items.toString());
	}
}

/**
 * 使用
 * @type {Stack}
 */
let stack = new Stack();
/**
 * 1.创建一个继承自Stack.prototype的新对象。
 * 2.执行构造函数Stack，执行的时候，相应的传参会被传入，同时上下文(this)会被指定为
 * 第一步创建的新实例。
 * 3.如果构造函数返回一个"对象",那么这个对象会取代步骤1中new出来的实例被返回。
 * 如果构造函数没有返回对象,那么new出来的结果为步骤一创建的对象。
 */
console.log(stack.isEmpty());
stack.push(5);
stack.push(8);
console.log(stack.peek());
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15);
stack.pop();
stack.pop();
console.log(stack.size());
stack.print();

/**
 * 十进制到二进制转换
 */
function divideBy2(decNumber) {
	
	let remStack = new Stack(),
		rem,
		binaryString = '';
	while (decNumber > 0 ) { //直到decNumber为0才停止
		rem = Math.floor(decNumber % 2); //对2取模，向上取整
		remStack.push(rem);
		decNumber = Math.floor(decNumber / 2); //将商赋给decNumber
	}
	
	while (!remStack.isEmpty()) {
		binaryString += remStack.pop().toString(); //如果余数栈不为空,将余数出栈
	}
	
	return binaryString;
}

console.log(divideBy2(233));

/**
 * 十进制转换为任意进制
 */
function baseConverter(decNumber, base) {
	
	let remStack = new Stack(),
		rem,
		baseString = '',
		digits = '0123456789ABCDEF';
	
	while (decNumber > 0) {
		rem = Math.floor(decNumber % base);
		remStack.push(rem);
		decNumber = Math.floor(decNumber / base);
	}
	
	while (!remStack.isEmpty()) {
		baseString += digits[remStack.pop()];
	}
	
	return baseString;
}

console.log(baseConverter(100345,2));
console.log(baseConverter(100345,8));
console.log(baseConverter(100345,16));
