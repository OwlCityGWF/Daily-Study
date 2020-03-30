####1.观察者模式
```ecmascript 6
const p1 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve('result')
  }, 1000);
})
p1.then(res => console.log(res), err => console.log(err));
```
- Promise的构造方法接收一个executor(),在new Promise()时就立刻执行这个executor回调.
- executor()内部的异步任务被放入到宏/微任务队列,等待执行.
- then()被执行,收集成功/失败回调,放入成功/失败队列.
- executor()的异步任务被执行,触发resolve/reject,从成功/失败队列中取出回调依次执行
> 这种收集依耐,触发通知,取出依耐执行的方式,被广泛运用于观察者模式的实现,在Promise里,执行顺序是then收集依耐.异步触发resolve；resolve执行依耐。
```ecmascript 6
class MyPromise {
  constructor(executor) {
    this._resolveQueue = []; // then收集的执行成功的回调队列
    this._rejectQueue = []; // then收集的执行失败的回调队列
  }
  // 由于resolve/reject是在executor内部被调用,因此需要使用箭头函数固定this指向,否则找不到this._resovleQueue
  let _resolve = (val) => {
    // 从成功队列里取出回调依次执行
    while (this._resolveQueue.length) {
      const callback = this._resolveQueue.shift();
      callback(val)
    } 
  }
  // 实现reject
  let _reject = (val) => {
    while (this._rejectQueue.length) {
      const callback = this._rejectQueue.shift();
      callback(val);
    }   
  }
  // new Promise()时立即执行executor,并传入resolve和reject
  executor(_resolve, _reject);
}

// then方法,接收一个成功的回调和一个失败的回调,并push进对应队列
  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn);
    this._rejectQueue.push(rejectFn);
  }
}
```
#### 2.Promise A+规范
> - 1.Promise本质是一个状态机，且状态只能为以下三种：Pending,Fulfilled,Rejected.状态的变更是单向的，只能从Pending -> Fulfilled或者Pending->Rejected,状态变更不可逆
> - 2.then方法接收两个可选参数,分别对应状态改变时触发的回调。then方法返回一个promise.then方法可以被同一个promise调用多次.
```ecmascript 6
 const PENDING = 'pending';
 const FULLFILLED = 'fulfilled';
 const REJECTED = 'rejected';

 class MyPromise {
   constructor(executor) {
    this._status = PENDING;
    this._resovleQueue = [];
    this._rejectQueue = [];
    
    let _resolve = (val) => {
      if (this._status !== PENDING) return;
      this._status = FULLFILLED;
      while (this._resovleQueue.length) {
        const callback = this._resovleQueue.shift();
        callback(val);
      } 
    }
    let _reject = (val) => {
      if (this._status !== PENDING) return
      this._status = REJECTED;
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift();
        callback(val);
      }
    }
    executor(_resolve, _reject)   
   }
   then(resolveFn, rejectFn) {
      this._resovleQueue.push(resolveFn);
      this._rejectQueue.push(rejectFn);
   }
 }
```
#### 3.then的链式调用
```ecmascript 6
const p1 = new Promise((resolve, reject) => {
  resolve(1);
})

p1.then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000);
  })
})
.then(res => {
  console.log(res)
  return 3
})
.then(res => {
  console.log(res)
})
```
> 如何实现这种链式调用
> 1.显然.then需要返回一个Promise,这样才能找到then方法,所以我们会把then方法的返回值包装成Promise
> 2..then()的回调需要顺序执行,以上代码为例,虽然中间return了一个Promise,但执行顺序仍要保证是1->2->3.我们要等待当前Promise状态变更后,再执行下一个then收集的回调,这就要求我们对then的返回值分类讨论.
```ecmascript 6
then(resolveFn, rejectFn) {
  return new MyPromise((resolve, reject) => {
    // 把resolveFn重新包装一下,再push进resolve执行队列，这是为了能够获取回调的返回值进行分类讨论
    const fulfilledFn = value => {
      try {
        // 执行第一个(当前的)Promise的成功回调,并获取返回值
        let x = resolveFn(value);
        // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (e) {
        reject(e);
      }
    }
    // 把后续then收集的依耐都push进当前Promise的成功回调队列中(_rejectQueue),这是为了保证顺序调用
    this._reolveQueue.push(fulfilledFn);
    // reject同理
    const rejectedFn = error => {
      try {
        let x = rejectedFn(error);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (e) {
        reject(e);
      }
    }
    this._rejectQueue.push(rejectedFn)
  })
}
```

#### 4.值穿透&状态已变更的情况
> 1.值穿透: 根据规范，如果then()接收的参数不是function,那么我们应该忽略它。如果没有忽略，当then()回调不为function时将会抛出异常,导致链式调用中断.
> 2.处理状态为resolve/reject的情况: 




























