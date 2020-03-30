### ECMAScript是JS语言的国际标准，JS是ECMAScript的实现
### Symbol数据类型
> 表示独一无二的值，用来定义独一无二的对象属性名.
- Symbol的定义
    一种Symbol类型可以通过使用Symbol()函数来生成.
    Symbol()函数可以接收一个字符串作为参数.
示例代码:
```ecmascript 6
let s1 = Symbol('web');
let s2 = Symbol('web');
console.log(s1 === s2); // false
```
Symbol()函数接收的参数相同，其变量的值也不同，s1和s2是Symbol类型的变量，因为变量的值不同，所以打印结果为false，使用typeof来获取相应的类型，所以打包的结果都为symbol.

- Symbol作为对象属性名
第一种:
示例代码:
```ecmascript 6
let symbol = Symbol();
let a = {};
a[symbol] = 'web';
```
首先声明了一个Symbol类型的变量symbol,一个空的对象为a,通过a[symbol]给a对象赋值一个web的字符串。表示symbol作为对象属性名，web作为它的属性值。

第二种：
```ecmascript 6
let symbol = Symbol();
let a = {
  [symbol]: 'web'
}
```
首先声明了一个Symbol类型的变量symbol,接着在声明对象a的同时通过[symbol]给对象属性赋值为web的字符串。

第三种：
示例代码：
```ecmascript 6
let symbol = Symbol();
let a = {};
Object.defineProperty(a, symbol,{ value: 'web'});
```
首先声明了一个Symbol类型的变量symbol,一个空对象为a,通过Object.defineProperty()方法给a对象赋值为web的字符串。
Symbol的值作为对象属性名，是不能用点运算符的。

#### Symbol使用场景
    1.因为Symbol的值是均不相等的，所以Symbol类型的值作为对象属性名，不会出现重复。
    2.代码形成强耦合的某一个具体的字符串。
#### Symbol获取
通过Object.getOwnPropertySymbols()方法，可以获取指定对象的所有Symbols属性名.

### let和const

- let是ES6规范中定义用于声明变量的关键字。
- 使用let声明的变量有一个块级作用域范围。
为什么需要块级作用域？因为内层变量可能会覆盖外层变量，在if或者for循环中声明的变量会泄露成为全局变量
```ecmascript 6
// 场景一
var temp = new Date();
console.log(temp);
function f() {
  console.log(temp)
  if (false) {
    var temp = 'hello'
  }
}
f();
```
```ecmascript 6
//场景二
if (true) {
  var web = 'web';
}
console.log(web);// web
```
块级作用域的前提是进行let变量声明
1.独立的一对大括号,两个大括号之间就是变量的块级作用域的范围.
2.条件语句,函数声明语句,循环语句等的一对大括号中就是变量的块级作用域范围.
const声明一个只读的常量。const一旦声明常量,其值不能被改变.
const和let只在声明的块级作用域内有效。否则会报错。
const命令声明的常量只能在声明的位置后面使用。
const声明的常量,与let一样不可重复声明。

### 变量的解构赋值
在ES6中可以从数组和对象中提取值。对变量进行赋值，称为解构赋值。
解构赋值就是只要等号两边的模式相同，左边的变量就会被对应赋值。
```ecmascript 6
let [x, y='b'] = ['a'];
console.log(y); // b

let [x, y='b'] = ['a', undefined];
console.log(y); // b

let [x, y='b'] = ['a', null];
console.log(y); // null
```

解构赋值分类：
1.数组的解构赋值
2.对象的解构赋值
3.字符串的解构赋值
4.数字以及布尔值的解构赋值
5.函数参数的解构赋值

解构赋值的情况:
1.完全解构
2.不完全解构

```ecmascript 6
let [a = 1, b] = [];
// a = 1, b = undefined
```

数组的解构赋值
```ecmascript 6
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
解构赋值允许指定默认值
```ecmascript 6
let [foo = true] = [];
foo // true
```
在使用默认值的时候，应该注意undefined,因为undefined是不能赋值的
```ecmascript 6
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

对象解构
```ecmascript 6
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // 'aaa'
bar // 'bbb'

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```
通过解构，我们可以很容易的把对象的方法复制给变量
```ecmascript 6
const { log } = console;
log('hello'); // hello
```
或者是
```ecmascript 6
const { log:minelog } = console;
minelog('hello');// hello
```
当我们使用解构赋值的时候，需要注意声明变量的作用域问题：
```ecmascript 6
//错误写法
let x;
{x} = {x: 1};
//正确写法
let x;
({x} = {x:1});
```
数组中是一个特殊的对象
```ecmascript 6
let arr = [1,2,3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```
不完全解构
```ecmascript 6
let obj = {p: [{y: 'word'}]};
let {p: [{y}, x]} = obj;

// x = undefined
// y = 'world
```
剩余运算符
```ecmascript 6
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10;
// b = 20;
// rest = {c:30, d: 40}
```

解构默认值
```ecmascript 6
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

字符串解构
```ecmascript 6
const [a, b, c, d, e] = 'hello';
a // 'h'
b // 'e'
c // 'l'
d // 'l'
e // '0'
```
当做一个对象解构
```ecmascript 6
let {lenngth: len} = 'hello';
len // 5
```
剩余运算符
```ecmascript 6
let [a, ...b] = [1, 2, 3];
//a = 1
// b = [2, 3]
```
函数参数的解构赋值
```ecmascript 6
function add([x,y]) {
  return x + y;
}

add([1,2]); // 3
```
计算函数任意个数之和
```ecmascript 6
function sum(...num) {
  let sumNum = 0;
  for (let i = 0; i < num.length; i++) {
    sumNum += parseInt(num[i])
  }
  console.log(sumNum);
}
```
### Set和Map
Set类似于数组,但是成员的值都是唯一的，没有重复的值.
Set使用add()方法添加元素,不会添加重复的值,所以Set可以对数组进行去重操作。
Map类似于对象,键名的值可以是各种类型的值
声明
1.使用new Set()构造函数来声明Set
2.使用new Map()构造函数来声明Map
共有的方法：delete删除,has有无，clear清空。对于Set的添加操作是add()，而Map是set设置和get获取
has是用来判断Set或者是Map中是否包含元素。
set可以用来新增或者是修改Map中的元素,只有Map有

遍历方法:
keys,values,entries,forEach
keys获取所有键,values获取所有值,entries获取所有键和值,forEach遍历所有键和值

### 箭头函数
1.如果箭头函数返回一个对象，需要用小括号包裹起来，不然会报错。
2.如果箭头函数的函数体只有一条语句并且不需要返回值，可以给这条语句前面加一个void关键字
```ecmascript 6
let fn = () => void doesNotReturn();
```
与普通函数的区别：
1.语法简洁、清晰.
2.箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
3.箭头函数继承而来的this指向永远不变
4.call()/.apply()/.bind()无法改变箭头函数中this的指向
5.箭头函数不能作为构造函数使用
我们先了解一下构造函数的new都做了些什么？简单来说，分为四步：
① JS内部首先会先生成一个对象；
② 再把函数中的this指向该对象；
③ 然后执行构造函数中的语句；
④ 最终返回该对象实例。
但是！！因为箭头函数没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函数不能定义成箭头函数，否则用new调用时会报错
6.箭头函数没有自己的arguments
箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是外层局部（函数）执行环境中的值。可以在箭头函数中使用rest参数代替arguments对象，来访问箭头函数的参数列表！！
7.箭头函数没有原型prototype
8.箭头函数不能用作Generator函数，不能使用yeild关键字


带参数的箭头函数
```ecmascript 6
let single = a => a;
single('web');
```
没有参数的箭头函数
```ecmascript 6
let log = () => {
  alert('web');
}
```
多个参数的箭头函数
```ecmascript 6
let add = (a, b) => a + b;
add(1,2);
```

### ES6相对于ES5的扩展
1.函数的扩展
2.对象的扩展
3.数组的扩展

#### 函数的扩展
>es6中函数的扩展包含: 默认值,剩余运算符,扩展运算符
- 默认值
> 在es5中,函数的默认值设定是,通过"||"进行设定的,当参数为undefined时,取默认值。在es6中,函数的默认值是写在参数定义的后面
```ecmascript 6
// es5
function log(x, y) {
  y = y || 'web';
  console.log(x, y);
}

function log(x, y='web') {
  console.log(x, y);
}
```
- 剩余运算符
> 剩余运算符表示语句: ...arr表示参数,指定的是可以有多个参数
```ecmascript 6
function web(...arr) {
  for (let item of arr) {
    console.log(item);
  }
}
web(1,3,4,5,6);
```
- 扩展运算符
```ecmascript 6
function add(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
var arr = [1,2,3];
add(...arr);
```
#### 对象的扩展
1.es6允许向对象直接写入变量和函数,作为对象的属性和方法
2.es6中允许使用表达式作为对象的属性,并且函数名称定义也可以采用相同的方式
3.setter和getter.js对象的属性是由名字，值和一组特性构成的。
es6中对象的操作方法:
Object.is():比较两个值是否相等.
Object.assign():用于将对象进行合并.
Object.getOwnPropertyDescriptor:返回对象属性的描述.
Object.keys()返回一个数组,包含对象自身所有的可枚举属性.

#### 数组的扩展
copyWithin(target,start,end):在当前数组内部,将指定位置的成员复制到其他位置,然后返回当前数组.
target:表示从改位置开始替换数据.如果是负值,表示倒数。
start:表示到改位置前停止读取数据,默认等于数组长度。如果负值，表示倒数。
find()表示用于找出第一个符号条件的数组成员。
findIndex()表示返回第一个符号条件的数组成员的位置，如果所有成员都不符合条件，则返回-1.
fill()表示填充一个数组,fill()方法用于空数组的初始化。
includes()表示该方法返回一个布尔值,表示某个数组是否包含给定的值

### ES6高级操作
####Promise对象
用于表示一个异步操作的最终状态,完成或是失败。
Promise是异步编程的一种解决方案,将异步操作以同步的流程表现出来,避免了多层回调函数嵌套问题
1.pending初始状态,既不是成功状态,也不是失败状态
2.fulfilled表示操作成功完成
3.rejected表示操作失败
当其中任何一种情况出现时,Promise对象的then()方法绑定的处理方法就会被调用
then()方法包含两个参数，onfulfilled和onrejected，他们都是function类型
当Promise为fulfilled状态时,调用then()方法的onfulfilled,当Promise为rejected状态时,调用then()方法的onrejected.
Promise.prototype.then和Promise.prototype.catch方法返回Promise对象,所以它们可以被链试调用。
####Iterator
Iterator遍历器是一种接口,为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署了Iterator接口,就可以完成遍历操作
Iterator的作用:
1.为各种数据结构,提供一个统一的,简便的访问接口。
2.使得数据结构的成员能够按某种次序排列.
3.ES6创造了一种新的遍历命令for...of循环.

原生具备Iterator接口的数据结构,数组,某些类数组的对象,Set结构和Map结构
```ecmascript 6
let obj = {
  data: ['web', 'job'],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };     
        } else {
          return {value: undefined, done: true};
        }     
      }       
    }   
  }
}
```

#### Generator
Generator是ES6提供的一种异步编程解决方案,在语法上，可以把它理解为一个状态机，内部封装了多种状态.
执行Generator,会生成并返回一个遍历器对象.返回的遍历器对象,可以依次遍历Generator函数的每一个状态.
Generator函数是一个普通的函数.
第一,function关键字与函数名之间有一个*号
第二,函数体内使用yield表达式来遍历状态
```ecmascript 6
function* newGenerator() {
  yield 'web';
  yield 'it';
  return 'ending';
}
```
执行Generator函数之后,并不会立即执行，返回的也不是函数运行结果,而是一个指向内部状态的指针对象.

使用遍历器对象的next()方法,使指针移向下一个状态.每一次调用next()方法,内部指针就会从函数头部或上一次停下的地方开始执行,直到遇到下一个yield表达式位置
Generator是分段执行的，yield表达式是暂停执行的标志，而next()方法可以恢复执行。
next()函数带参数,该参数作为上一次yield表达式的返回值,因为yield本身没有返回值的

### Class
```ecmascript 6
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return `name:${this.name}age:${this.age}` 
  } 
}
let obj = new Person('web', 12);
console.log(obj.say());
```
    










