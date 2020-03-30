/**
 * this绑定规则
 * 1.默认绑定(严格/非严格模式)
 * 2.隐式绑定
 * 3.显示绑定
 * 4.new绑定
 * 5.箭头函数绑定
 */
/**
 * 1.调用位置:
 * 函数在代码中被调用但位置: 当前正在执行的函数的前一个调用中
 */
// function baz() {
// 	console.log('baz');
// 	bar(); // <-- bar调用位置
// }
//
// function bar() {
// 	console.log('bar');
// 	foo(); // <-- foo调用位置
// }
//
// function foo() {
// 	console.log('foo');
// }
//
// baz(); // <-- baz调用位置

/**
 * 2 绑定规则
 */
/**
 *2.1默认位置
 * 独立函数调用,可以把默认看作是无法应用其他规则时的默认规则,this指向全局对象
 * 严格模式下,不能将全局对象用于默认绑定,this会绑定到undefined。只有函数运行在非严格模式下,默认绑定才能绑定到全局对象.
 * 在严格模式下调用函数则不影响默认绑定.
 */
// function afoo() {
// 	"use strict";
//
// 	console.log( this.a ); // TypeError: Cannot read property 'a' of undefined
// }
//
// var a = 2;
//
// afoo();

// function bfoo() {
// 	console.log(this.a);
// }
//
// var a = 2;
//
// (function () {
// 	"use strict";
//
// 	bfoo();
// })();

/**
 * 2.2 隐式绑定
 * 当函数引用上下文对象时,隐式绑定规则会把函数中的this绑定到这个上下文对象.
 * 对象属性引用链中只有上一层或者说最后一层在调用中起作用
 */
//
// function cfoo() {
// 	console.log(this.a);
// }
//
// var obj = {
// 	a: 2,
// 	cfoo: cfoo
// };
//
// obj.cfoo();

/**
 * 被隐式绑定的函数特定情况下会丢失绑定对象,应用默认绑定,把this绑定到全局对象或者undefined上.
 */
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo;

var a = "oops, global";

bar();

/**
 * 参数传递
 */
function fooTest() {

}
