### 一.Event Loop是什么
> Event Loop是一个程序结构,用于等待和分派消息和事件.JS中的Event Loop是浏览器或Node的一种协调JS单线程运行时不会阻塞的一种机制.
### 二.进程和线程
1. 进程： 进程是CPU资源分配的最小单位
2. 线程: 线程是CPU调度的最小单位
### 三.JS的单线程
JS从诞生起就是单线程,原因大概是不想让浏览器变得太复杂,因为多线程需要共享资源,且有可能修改彼此的运行结果,对于一种网页脚本语言来说,这就太复杂了
准确的来说,JS单线程是指JS引擎是单线程的，JS的引擎并不是独立运行的，跨平台意味着JS依耐其运行的宿主环境--浏览器（Node）
浏览器需要渲染DOM,JS可以修改DOM结构，JS执行时,浏览器DOM渲染停止,如果JS引擎线程不是单线程的，那么可以同时执行多段JS,如果这么多段JS都操作DOM，那么就会出现DOM冲突

### 浏览器
#### 浏览器的多线程
##### 浏览器主线程常驻线程
1.GUI渲染线程
    - 绘制页面,解析HTML,CSS,构建DOM树,布局和绘制等
    - 页面重绘和回流
    - 与JS引擎线程互斥,也就是所谓的JS执行阻塞页面更新
2.JS引擎线程
    - 负责JS脚本代码的执行
    - 负责准执行准备好执行的事件,即定时器计数结束,或异步请求成功并正确返回的事件.
    - 与GUI渲染线程互斥,执行时间过长将阻塞页面的渲染
3.事件触发线程
    - 负责将准备好的事件交给JS引擎线程执行
    - 多个事件加入任务队列的时候需要排队等待
4.定时器触发线程
    - 负责执行异步的定时器类的事件,如setTimeout,setInterval
    - 定时器到时间之后把注册的回调加到任务队列的队尾.
5.HTTP请求线程
    - 负责执行异步请求
    - 主线程执行代码遇到异步请求的时候会把函数交给该线程处理，当监听到状态变更事件,如果有回调函数，该线程会把回调函数加入到任务队列的队尾等待执行
#### 浏览器端的Event Loop
1.Call Stack：调用栈(执行栈),所有同步任务在主线程上执行,形成一个执行栈,因为JS单线程的原因,所以调用栈中每次只能执行一个任务,当遇到的同步任务执行完之后，由任务队列提供任务给调用栈执行。
2.Task Queue: 任务队列,存放着异步任务,当异步任务可以执行的时候,任务队列会通知主线程,然后该任务会进入主线程执行.任务队列中的都是已经完成的异步操作,而不是说注册一个异步任务就会被放在这个任务队列中.
Event Loop不断地从任务队列中取出任务执行的一个过程

#### 同步任务和异步任务
异步任务通过注册回调函数,等到数据来了就通知主程序.

    1.同步任务:必须等到结果来了之后才能做其他的事情.
    2.异步任务:不需要等到结果来了才能继续往下走,等结果期间可以做其他的事情，结果来了会收到通知.
    3.JS代码执行时,主线程会从上到下一步步到执行代码,同步任务会被依次加入执行栈中先执行,异步任务会在拿到结果的时候将注册的回调函数放入任务队列,当执行栈中没有任务在执行的时候,引擎会从任务队列中读取任务并压入执行栈(Call Stack)中处理执行.
#### 宏任务和微任务
浏览器环境的宏任务和微任务

- 宏任务:
  1.script(整体的代码)
  2.setTimeout
  3.setInterval
  4.I/O操作
  5.UI渲染
- 微任务
  1.Promise.then
  2.MutationObserver
#### 事件运行顺序
1.执行同步任务,同步任务不需要做特殊处理,直接执行.第一轮从script开始
2.从宏任务队列中取出对头任务执行
3.如果产生了宏任务,将宏任务放入宏任务队列,下次轮询的时候执行
4.如果产生了微任务,将微任务放入微任务队列
5.执行完当前宏任务之后,取出微任务队列中的所有任务依次执行
6.如果微任务执行过程中产生了新的微任务,则继续执行微任务,直到微任务的队列为空
7.轮询，循环以上2-6
总的来说就是:同步任务/宏任务->执行产生的所有微任务(包括微任务产生的微任务)->同步任务/宏任务->执行产生的所有微任务(包括微任务产生的微任务)->循环...
```ecmascript 6
console.log('script start');
setTimeout(() => {
  console.log('setTimeout');
}, 0)

new Promise((resolve, reject) => {
  console.log('promise1')
  resolve();
})
.then(()=> {
  console.log('then11');
  new Promise((resolve, reject) => {
  console.log('promise2')
  resolve();
  })
  .then(()=>{
    console.log('then2-1');
    resolve();
  })
  .then(()=>{
    console.log('then2-2')
  })
})
.then(()=>{
  console.log('then12')
})
console.log('script end');
// script start->promise1->script end->then11->promise2->then2-1->then12->then2-2-setTimeout
```
### 宏任务？微任务？
- 宏任务
的本质可以认为是多线程事件循环或消息循环,也就是线程间通信的一个消息队列,由浏览器派发,与JS引擎无关,参与了Event Loop调度的任务
- 微任务
微任务是在运行宏任务/同步任务的时候产生的,是属于当前任务的,所以它不需要浏览器的支持，内置在js当中,直接在JS的引擎中就被执行掉了
### 特殊的点
    1.async隐式返回Promise作为结果.
    2.执行完await之后直接跳出async函数,让出执行的所有权.
    3.当前任务的其他代码执行完之后再次获得执行权进行执行
    4.立即resolve的Promise对象,是在本轮"事件循环"的结束时执行,而不是在下一轮"事件循环"的开始时
```ecmascript 6
console.log('script start');
async function async1() {
  await async2();
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end');
}
async1();
setTimeout(()=>{
  console.log('setTimeout')
}, 0);

new Promise(resolve => {
  console.log('Promise')
  resolve();
})
.then(() => {
  console.log('promise1')
})
.then(() => {
  console.log('promise2');
})
console.log('script end');
// 注意Chrome73之前的版本async函数的执行权是作为微任务的队尾,但是后面的版本是作为微任务的队头(因为使用了PromiseResolve对await进行了优化,减少了Promise的再次创建)
// script start -> saync2 end -> Promise -> script end -> saync1 end -> promise1 -> promise2 -> setTimeout
```
#### Node中的Event Loop
    Node与浏览器事件循环不同,其中有多个宏任务队列,而浏览器是只有一个宏任务队列
    Node的架构底层是有libuv，它是Node自身的动力来源之一,通过它可以去调用一些底层操作,Node中的Event Loop功能就是在libuv中封装实现的
##### 宏任务和微任务
    列出浏览器端没有的
- 宏任务
  1.setImmediate
- 微任务
  1.process.nextTick
##### 事件循环机制的六个阶段
    Node的事件循环分成了六个阶段,每个阶段对应一个宏任务队列,相当于是宏任务进行了一个分类
    1.timers(计时器)
      执行setTimeout以及setInterval的回调
    2.I/O callbacks
      处理网络,流，TCP的错误回调
    3.idel，prepare --- 闲置阶段
    node内部使用
    4.poll(轮循)
    执行poll中的I/O队列,检查定时器是否到时间
    5.check(检查)
    存放setImmediate回调
    6.close callbacks
    关闭回调,例如socket.on('close')   
#### Node和浏览器端有什么不同
    1.浏览器端的Event Loop和Node.js中的Event Loop是不同的,实现机制也不一样
    2.Node.js可以理解成有4个宏任务和2个微任务队列,但是执行宏任务时有6个阶段
    3.Node.js中限制性全局script代码,执行完同步代码后,先从微任务队列next tick queue中取出所有任务放入调用栈执行,再从其他微任务队列中取出所有任务放入调用栈中执行，然后开始宏任务的6个阶段,每个阶段都将其宏任务队列中的所有任务都取出来执行(浏览器是只取第一个执行),每个宏任务阶段执行完毕之后开始执行微任务，再开始执行下一阶段宏任务

```ecmascript 6
new Promise((resolve, reject) => {
  console.log('promise1', 1)
  resolve()
})
.then(()=>{
  console.log("then11", 2)
  new Promise((resolve, reject) => {
    console.log('promise2', 3)
    resolve()
  })
  .then(()=>{
    console.log('promise21',4)
    new Promise((resolve, reject) => {
      console.log("promise3", 5)
      resolve();
    })
    .then(()=>{
      console.log("then31", 7)
    })
    .then(()=>{
      console.log("then32", 9)
    })
  })
  .then(()=>{
    console.log("then22", 8)
  })
})
.then(()=>{
  console.log("then12", 6)
})
// ? 为什么then12先于promise31输出
// promise1 -> then11 -> promise2 -> primise21 -> promise3 -> then12 -> promise31 -> then22 -> then32
```























