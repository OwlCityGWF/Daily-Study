/**
 * 构造函数:
 *  返回创建实例对象时构造函数的引用,此属性的值是对函数本身的引用，而不是一个包含名称的字符串.
 */
function Parent(age,name) {
	this.age = age;
	this.name = name;
	this.habit = 'swiming';
}

var p = new Parent(50);
console.log(p.constructor === Parent);
console.log(p.constructor === Object);

/**
 * 普通函数创建d 实例不一定有constructor属性
 */
function parent2(age) {
	this.age = age;
}

var p2 = parent2(50);
console.log(p2);

function parent3(age) {
	return {
		age: age
	}
}

var p3 = parent3(50);
console.log(p3.constructor === Object);

/**
 * Symbol是基本数据类型，但实例可以获取constructor属性
 */
var sym = Symbol(123);
console.log(sym);
console.log(sym.constructor);
console.log(Symbol.prototype.constructor === Symbol);

/**
 * 对于引用类型来说constructor属性值可以修改，但是对于基本数据类型来说是只读的
 * 在原型链继承中，对constructor重新赋值进行修正
 */
function Foo() {
	this.value = 42;
}

Foo.prototype = {
	method: function () {}
};

function Bar() {}

Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';

Bar.prototype.constructor === Object;
Bar.prototype.constructor = Bar;

var test = new Bar();
console.log(test);

function NEW() {
	let obj = new Object(),
		Con = [].shift.call(arguments);
	Object.setPrototypeOf(obj,Con.prototype);
	let ret = Con.apply(obj,arguments);
	return ret instanceof Object ? ret : obj;
}

/**
 * 如果要创建一个新对象,并同时继承另一个对象的[[prototype]],使用Object.create();
 */

/**
 * 优化new
 */
function PARENT(name, age) {
	this.name = name;
	this.age = age;
	this.habit = 'swiming';
}

function create() {
	Con = [].shift.call(arguments);
	var obj = Object.create(Con.prototype);
	var ret = Con.apply(obj, arguments);
	return ret instanceof Object ? ret : obj;
}

let result = create(PARENT, 'jack','18');
console.log(result);

/**
 * 原型链
 *  每个对象拥有一个原型对象,通过__proto__指针指向上一个原型,并从中继承方法和属性,同时原型对象也可能拥有原型,这样一层一层,最终指向null.这种关系被称为原型链.
 */
function AParent(age) {
	this.age = age;
}

var p = new AParent(50);
console.log(p.constructor === AParent);
console.log(p.__proto__ === AParent.prototype);
console.log(p.__proto__.__proto__ === Object.prototype);
console.log(p.__proto__.__proto__.__proto__ === null);



