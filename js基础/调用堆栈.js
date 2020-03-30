// ### 栈数据结构FILO.
// ### 堆数据结构是一种树状结构.
// ### 队列数据结构FIFO.事件循环的结构.
// ### 变量存放
//     1.基本类型-->保存在栈内存中,因为这些类型在内存中分别占有固定大小的空间，通过按值来访问.基本类型一共6种:Undefined,Null,Boolean,Number,String和Symbol
//     2.引用类型-->保存在堆内存中,因为这种值的大小不固定,因此不能把他们保存到栈内存中,但内存地址大小是固定的,因此保存在堆内存中,在栈内存中存放的只是该对象的访问地址.当查询引用类型的变量时,先从栈中读取内存地址,然后再通过地址找到堆中的值.对于这种,我们把它叫做按引用访问.
//     3.栈比堆的运算速度快,将引用类型存在堆中是为了不影响栈堆效率.

/**
 * a,b基本类型，都有各自独立的栈空间，互不影响
 */
// var a = 20;
// var b = a;
// b = 30;
// console.log(a);

/**
 * a,b引用类型栈内存放地址指向堆内存
 * 中的对象,引用类型的复制会为新的变量
 * 自动分配一个新的值保存在变量对象中,
 * 但只是引用类型但一个地址指针而已,实际
 * 指向但是同一个对象
 */
// var a = { name: '前端开发' };
// var b = a;
// b.name = '进阶';
// console.log(a.name);

/**
 * null是基本类型,a=null之后只是把a
 * 存储在栈内存中地址改变成了基本类型null
 * 并不会影响堆内存中的对象,所以b的值不受影响
 */
// var a = { name: '前端开发'};
// var b = a;
// a = null;
// console.log(b);
/**
 * new的实现原理
 */

function TEST(name, age) {
    this.name = name;
    this.age = age;
    this.habit = 'Swiming';
}

function New() {
    let obj = new Object(), // 1.创建一个空对象
        Constructor = [].shift.call(arguments); // 2.获得构造函数,同时删除arguments中第一个参数
    Object.setPrototypeOf(obj, Constructor.prototype); // 3.链接到原型,obj可以访问到构造函数原型中的属性
    // obj.__proto__ = Constructor.prototype;
    let ret = Constructor.apply(obj, arguments); // 4. 绑定this实现继承,obj可以访问到构造函数中的属性
    return ret instanceof Object ? ret : obj // 5.优先返回构造函数返回的对象
}


let result = New(TEST, 'a', 18);
console.log(result);

/**
 * 内存空间管理
 * js内存生命周期
 * 1.分配所需要的内存
 * 2.使用分配到的内存(读,写)
 * 3.不需要时将其释放,归还.
 * js自动垃圾收集机制,最常用的是通过标记清除算法
 * 来找到那些对象不再是继续使用的,将对象引用释放,
 * 脱离执行环境,这个值会在下一次垃圾收集器执行操作时
 * 被找到并释放.
 * 在局部作用域中,当函数执行完毕,局部变量也就没有存在的
 * 必要,因此垃圾收集器很容易作出判断并回收
 * 但是全局变量自动释放内存空间很难判断时间
 * 因此,需要尽量避免使用全局变量
 */

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);

