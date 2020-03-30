#### 1.MVVM模式
> MVC模式是指用户操作会请求服务器路由,路由会调用对应的控制器来处理,控制器会获取数据.将结果返回给前端,页面重新渲染.并且前端会将数据手动的操作DOM渲染到页面上，非常消耗性能.
> Vue中的设计不再需要用户手动操作DOM元素,而是将数据绑定到viewModel层上,数据会自动渲染到页面上,视图变化会通知viewModel层更新数据.viewModel就是MVVM模式中的桥梁.

#### 2.Vue中响应式数据的原理
> Vue在初始化的时候,也就睡new Vue()的时候,会调用底层的一个initData()方法,方法中有一个observe()会将初始化传入的data进行数据响应式控制,其中会对data进行一系列操作,判断是否已经被观测过。判断观测的数据是对象还是数组.
- 观测的数据是对象
> 如果观测的是一个对象,会调用一个walk()方法其内部就是调用Object.defineProperty进行观测,如果对象内部的属性还是一个对象的话,就会进行递归观测。
>这时当对当前对象取值的时候就会调用get方法,get方法中就进行依耐收集(watcher),如果对当前对象进行赋值操作,就会调用set方法,set方法中会判断新旧值是否不一样,不一样就会调用一个notify方法去触发数据对应的依耐收集进行更新.
- 观测的数据是一个数组
> 如果观测的是一个数组，数组不会走上面的方法进行依耐收集,Vue底层重写了数组的原型方法，当前观测的是数组时，vue将数组的原型指向了自己定义的原型方法，并且只拦截了以下7个数组的方法
```ecmascript 6
// 因为只有以下7种数组方法才会去改变原数组
push(), pop(), shift(), unshift(), splice(), sort(), reverse()
```
> 原型方法内部采用的是函数劫持的方式，如果用户操作的是以上7种数组方法，就会走Vue重写的数组方法。这时候就可以在数组发生变化的时候，去手动调用notify方法去更新视图.
> 当然在对数据进行数据更新的时候,也会对新增的数据进行依耐收集观测.如果数组中的数据也是对象,它会继续调用Object.defineProperty对其进行观测. 这也就是为何通过修改数组下标修改数据，数据变化了但是视图没有更新的原因
- 观测对象核心代码
```ecmascript 6
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter() {
    const value = getter ? getter.call(obj) : val;
    if (Dep.target) {
      dep.depennd();
      if (childOb) {
        childOb.dep.depend()
        if (Array.isArray(value)) {
          dependArray(value)
        }   
      }   
    }   
    return value;
  },
  set: function reactiveSetter(newVal) {
    const value = getter ? getter.call(obj) : val;
    if (newVal === value || (newVal !== newVal && value !== value)) {
      return;
    }
    if (process.env.NODE_ENV !== 'production' && customSetter) {
      customSetter();
    } 
    val = newVal;
    childObj = !shallow && obseve(newVal);
    dep.notify();
    }
  }
)
```
- 观测数组核心代码
```ecmascript 6
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) { // 重写原型方法
  const original = arrayProto[method] // 调用原数组的方法
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify() // 当调用数组方法后，手动通知视图更新
    return result
  })
})

this.observeArray(value) // 进行深度监控
```     
#### 3.Vue采用异步渲染的原因是什么?
> Vue是组件级更新
>当我们操作某个组件中的方法进行数据更新的时候,如果一旦更改数据就进行视图的渲染,必然会影响性能,因此Vue采用异步渲染方式,也就是多个数据在一个事件中同时被更改了,同一个watcher被多次触发,只会被推入到队列中一次.当最后数据被更改完毕以后调用nextTick方法去异步更新视图.内部还有一些其它的操作，例如添加watcher的时候给一个唯一的id,更新的时候根据id
>进行一个排序,更新完毕还会调用对应的生命周期beforeUpdate和updated方法等.

#### 4.Vue中nextTick实现原理
> 当我们执行JS代码的时候其实就是往执行栈中放入函数,遇到异步代码会被挂起并在需要执行的时候加入到Task(有多种Task)队列中,一旦执行栈为空,Event Loop就会从Task队列中拿出需要执行的代码并放入执行栈中执行,所以本质上来说JS中的异步还是同步行为.
> 不同的任务源会被分配到不同的Task队列中,任务源可以分为微任务(microtask)和宏任务(macrotask)
> 微任务包括process.nextTick,promise.then,MutationObserver,其中process.nextTick为Node独有.宏任务包括 script,setTimeout,setInterval,setImmediate, I/O, UI rendering
> Vue在内部对异步队列尝试使用原生的Promise.then,MutationObserver和setImmediate,如果执行环境不支持,则会采用setTimeout(fn,0)代替.
> 总结: nextTick方法主要是使用了宏任务和微任务，定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列，所以这个nextTick方法就是异步方法。
 ````ecmascript 6
let timerFunc  // 会定义一个异步方法
if (typeof Promise !== 'undefined' && isNative(Promise)) {  // promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && ( // MutationObserver
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' ) { // setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {   // setTimeout
    setTimeout(flushCallbacks, 0)
  }
}
// nextTick实现
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}
````

#### 5.Vue中computed的原理
> computed和watch的原理都是使用watcher实现的,区别就是computed具有缓存的功能
> 当我们默认初始化创建计算属性的时候,他会创建一个watcher,并且这个watcher有两个属性lazy:true，dirty: true,也就是说当创建一个计算属性的时候，默认是不执行的,只有当用户取值的时候(也就是在组件上使用的时候),它会判断如果dirty:true的话就会让这个watcher执行去取值,并且在值结束后,更改dirty:false
>这样当你再次使用这个计算属性的时候判断条件走到dirty: false的时候，就不再执行watcher求值操作,而是直接返回上次求值的结果
>什么时候会重新计算求值呢？
>只有当计算属性的值发生变化的时候，它会调用对应的update方法,然后更改dirty:true，然后执行的时候根据条件重新执行watcher求值。
```typescript
function initComputed (vm: Component, computed: Object) {
  const watchers = vm._computedWatchers = Object.create(null)
  const isSSR = isServerRendering()
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) { // 如果依赖的值没发生变化,就不会重新求值
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

#### 6.Watcher中的deep: true是如何实现的?
> 通常我们在项目中一般使用watch来监听路由或者data中的属性发生变化时作出对应的处理方式.
> 那么deep：true的使用场景就是当我们监测的属性是一个对象的时候，我们会发现watch中监测的方法并没有被执行,原因是受现代JS的限制,Vue不能检测到对象属性的添加或删除。由于Vue会在初始化实例时对属性执行getter/setter转化过程.所以属性必须在data对象上存在才能让Vue转换它,这样才能让它是响应式的.
> deep的意思就是深入观察,监听器会一层层的往下遍历,给对象的所有属性都加上这个监听器,但是这样性能开销就会非常大了,任何修改obj里面任何一个属性都会触发这个监听器里的handler.
> 当然除了改变数组的方法可以进行监测数组变化,Vue也提供Vue.set()方法
```ecmascript 6
get () {
    pushTarget(this) // 先将当前依赖放到 Dep.target上
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      if (this.deep) { // 如果需要深度监控
        traverse(value) // 会对对象中的每一项取值,取值时会执行对应的get方法
      }
      popTarget()
    }
    return value
}
function _traverse (val: any, seen: SimpleSet) {
  let i, keys
  const isA = Array.isArray(val)
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  if (isA) {
    i = val.length
    while (i--) _traverse(val[i], seen)
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen)
  }
}
```
#### 7.Vue中的生命周期
- beforeCreate() {}
> 在实例初始化以后,数据观测(data observe)之前进行调用,此时获取不到data中的数据
- created() {}
> 在实例创建完成之后调用,这时候实例已经完成了数据观测,属性和方法的运算,watch/event事件回调.这里还没有$el
- beforeMount() {}
> 在挂载之前调用,相关的render函数首次被调用.
- mounted() {}
> el绑定的元素被内部新创建的$el替换掉,并且挂载到实例上去之后调用.
- beforeUpdate() {}
> 数据更新时调用,发生在虚拟DOM重新渲染和打补钉之前.
- updated() {}
> 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- beforeDestory() {}
> 实例销毁之前调用,这一步,实例仍然完全可用
- destoryed() {}
> Vue实例销毁后调用,调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除。所有的子实例也会被销毁，该钩子在服务器渲染期间不被调用
#### 8.Vue模版编译原理
> Vue在底层会调用一个parseHTML方法将模版转为AST语法树(内部通过正则走一些方法),最后将AST语法树转为render函数(渲染函数),渲染函数结合数据生成Virtual DOM树,Diff和Patch后生成新的UI.
#### 9.关于虚拟DOM
> Vue的编译器在编译模版之后,会把这些模版编译成一个渲染函数。而函数被调用的时候会渲染并且返回一个虚拟DOM树.当我们有了这个虚拟的树之后，再交给一个Patch函数，负责把这些虚拟DOM真正施加到真实的DOM上.
> 在这个过程中,Vue有自身的响应式系统来侦测在渲染过程中所依耐到的数据来源。在渲染过程中，侦测到数据来源之后就可以精确感知数据源的变动。到时候就可以根据需要重新进行渲染。当重新进行渲染之后。会生成一个新的树，将新的树与旧的树进行对比，就可以最终得出应施加到真实DOM上的改动.
> 最后再通过Patch函数施加改动。简单点讲,在Vue的底层实现上，Vue将模版编译成虚拟DOM渲染函数.结合Vue自带的响应系统，在应该状态改变时,Vue能够智能地计算出重新渲染组件的最小代价并应用到DOM操作上.
#### 10.v-if和v-show的区别以及底层实现
- v-if
> 如果当前条件判断不成立，那么当前指令所在节点的DOM元素不会渲染
- v-show
> 当前指令所在节点的DOM元素始终会被渲染,只是根据当前条件动态改变display：none || block，从而达到DOM元素的显示和隐藏
- 底层实现方式
- v-if
```vue
VueTemplateCompiler.compile(`<div v-if="true"><span v-for="i in 3">hello</span></div>`);

with(this) {
    return (true) ? _c('div', _l((3), function (i) {
        return _c('span', [_v("hello")])
    }), 0) : _e() // _e()方法创建一个空的虚拟dom等等。
}
```
> 通过上述代码，可以得知如果当前条件判断不成立，那么当前指令所在节点的DOM元素不会渲染
  
- v-show
v-show编译出来没有任何东西,只有一个directives，它里面有一个指令叫做v-show
```vue
VueTemplateCompiler.compile(`<div v-show="true"></div>`);
/**
with(this) {
    return _c('div', {
        directives: [{
            name: "show",
            rawName: "v-show",
            value: (true),
            expression: "true"
        }]
    })
}
```
只有在运行的时候它会去处理这个指令
```vue
// v-show 操作的是样式  定义在platforms/web/runtime/directives/show.js
bind (el: any, { value }: VNodeDirective, vnode: VNodeWithData) {
    vnode = locateNode(vnode)
    const transition = vnode.data && vnode.data.transition
    const originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display
    if (value && transition) {
      vnode.data.show = true
      enter(vnode, () => {
        el.style.display = originalDisplay
      })
    } else {
      el.style.display = value ? originalDisplay : 'none'
    }
}
```

#### 11.在项目中v-for为什么不能和v-if连用
> v-for的优先级比v-if高,那么在编译阶段会发现它给内部的每一个元素都添加了v-if，这样在运行的阶段会走验证,这样非常的消耗性能
> 如果有这样的需求可以通过计算属性来达到目的
```vue
<div v-for="i in computedNumber">hello</div>
export default {
  data() {
    return {
      arr: [1,2,3]
    }
  },
  coumputed: {
    computedNumber() {
      return arr.filter(item => item > 1)
    }
  }
}
```
#### 12.关于虚拟DOM的实现过程
> 用一个对象来描述我们的虚拟DOM结构
```ecmascript 6
let obj = {
  tag: 'div',
  data: {
    id: 'container'
  },
  children: [
    {
      tag: 'p',
      data: {},
      children: {}
    } 
  ]
}
```
```ecmascript 6
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

function createElement (context, tag, data, children, normalizationType, alwaysNormalize) {

    // 兼容不传data的情况
    if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children
        children = data
        data = undefined
    }

    // 如果alwaysNormalize是true
    // 那么normalizationType应该设置为常量ALWAYS_NORMALIZE的值
    if (alwaysNormalize) normalizationType = ALWAYS_NORMALIZE
        // 调用_createElement创建虚拟节点
        return _createElement(context, tag, data, children, normalizationType)
    }

    function _createElement (context, tag, data, children, normalizationType) {
        /**
        * 如果存在data.__ob__，说明data是被Observer观察的数据
        * 不能用作虚拟节点的data
        * 需要抛出警告，并返回一个空节点
        * 
        * 被监控的data不能被用作vnode渲染的数据的原因是：
        * data在vnode渲染过程中可能会被改变，这样会触发监控，导致不符合预期的操作
        */
        if (data && data.__ob__) {
            process.env.NODE_ENV !== 'production' && warn(
            `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
            'Always create fresh vnode data objects in each render!',
            context
            )
            return createEmptyVNode()
        }

        // 当组件的is属性被设置为一个falsy的值
        // Vue将不会知道要把这个组件渲染成什么
        // 所以渲染一个空节点
        if (!tag) {
            return createEmptyVNode()
        }

        // 作用域插槽
        if (Array.isArray(children) && typeof children[0] === 'function') {
            data = data || {}
            data.scopedSlots = { default: children[0] }
            children.length = 0
        }

        // 根据normalizationType的值，选择不同的处理方法
        if (normalizationType === ALWAYS_NORMALIZE) {
            children = normalizeChildren(children)
        } else if (normalizationType === SIMPLE_NORMALIZE) {
            children = simpleNormalizeChildren(children)
        }
        let vnode, ns

        // 如果标签名是字符串类型
        if (typeof tag === 'string') {
            let Ctor
            // 获取标签名的命名空间
            ns = config.getTagNamespace(tag)

            // 判断是否为保留标签
            if (config.isReservedTag(tag)) {
                // 如果是保留标签,就创建一个这样的vnode
                vnode = new VNode(
                    config.parsePlatformTagName(tag), data, children,
                    undefined, undefined, context
                )

                // 如果不是保留标签，那么我们将尝试从vm的components上查找是否有这个标签的定义
            } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
                // 如果找到了这个标签的定义，就以此创建虚拟组件节点
                vnode = createComponent(Ctor, data, context, children, tag)
            } else {
                // 兜底方案，正常创建一个vnode
                vnode = new VNode(
                    tag, data, children,
                    undefined, undefined, context
                )
            }

        // 当tag不是字符串的时候，我们认为tag是组件的构造类
        // 所以直接创建
        } else {
            vnode = createComponent(tag, data, context, children)
        }

        // 如果有vnode
        if (vnode) {
            // 如果有namespace，就应用下namespace，然后返回vnode
            if (ns) applyNS(vnode, ns)
            return vnode
        // 否则，返回一个空节点
        } else {
            return createEmptyVNode()
        }
    }
}
```
#### 13.diff算法的时间复杂度,以及Vue中diff算法原理






























