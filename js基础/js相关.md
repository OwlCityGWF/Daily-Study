#### 1.ES5与ES6继承方式区别

- ES5定义类以函数形式,以prototype来实现继承.
- ES6以class形式定义类,以extends形式继承.

#### 2.Generator了解
ES6提供的一种异步编程解决方案,Generator函数是一个状态机,封装了多个内部状态.
```ecmascript 6
function* helooWordGenerator() {
  yield 'hello';
  yield 'world';
  yield 'ending';
}

let hw = helooWordGenerator();
```
调用后返回指向内部状态的指针,调用next()才会移向下一个状态,参数:
```ecmascript 6
hw.next();
// { value: 'hello', done: false }
hw.next();
// { value: 'world', done: false }
hw.next();
// { value: 'ending', done: true }
hw.next();
// { value: undefined, done: true }
```

#### 3.手写Promise实现
```ecmascript 6
let myPromise = new Promise((resolve, reject) => {
  // 需要执行的代码
  if (/*异步执行成功*/) {
    resolve(value)
  } else if (/*异步执行失败*/) {
    reject(error)
  } 
})

myPromise.then((value)=>{
  // 成功后回调,使用value值
}, (error) => {
  // 失败后调用,获取错误信息error
})
```
#### 4.Promise优缺点

- 优点: 解决回调地狱,对异步任务写法更标准化与简洁化
- 缺点: 首先,无法取消Promise,一旦新建它就会立即执行,无法中途取消;其次,如果不设置回调函数,Promise内部抛出的错误,不会反应到外部;第三,当处于pending状态时,无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)
```ecmascript 6
function promise() {
  this.msg = '';
  this.status = 'pending';
  let that = this;
  let process = arguments[0];
  
  process (function() {
    that.status = 'fufilled';
    that.msg = arguments[0];
  }, function() {
    that.status = 'rejected';
    that.msg = arguments[0];
  })
  return this;
}

promise.prototype.then = function() {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}
```

#### 5.观察者模式
发布-订阅者模式
发布者管理订阅者队列,并有新消息推送功能、订阅者仅关注更新就行

#### 6.手写实现bind
```ecmascript 6
Function.prototype.bind = function() {
  let self = this;
  let context = Array.prototype.shift.call(arguments);
  let arg = Array.prototype.slice.call(arguments)
  return function() {
    self.apply(context, Array.prototype.concat.call(arg, Array.prototype.slice.call(arguments)))
  }
}
```

#### 7.手写实现四种继承
