### _init()
vue构造函数核心是调用_inti方法
```typescript
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this;
  vm._uid = uid++;
  [1]
  let startTag, endTag;
  if (process.env.NODE_ENv !== 'production' && config.performace && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)  
  }
  vm._isVue = true;
  if (options && options._isComponent) {
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), 
    options || {},
    vm)  
  }
  if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }
vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    [2]
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}
```
[1]和[2]之间的代码主要是进行性能追踪
    
    接下来是一个合并options的操作
    接下来调用很多初始化函数,从函数名称可以看出分别是执行初始化生命周期，初始化事件中心，初始化渲染等操作
### initState如何处理data
```ecmascript 6
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativaWatch) {
    initWatch(vm, opts.watch)
  }
}
```    
initState是对props,methods,data,computed,watch的处理。
```ecmascript 6
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```
    这里给实例添加属性_data并把data赋值给它,然后判断data如果是一个函数的话会检查函数返回值是不是纯对象,如果不是会抛出警告
    在vue中,data属性名和methods中的函数名,props的属性名都不能重名,这就是接下来代码所做的工作.这里遍历了data的所有属性，然后和methods和props中的进行对比,如果重名则会抛出警告.如果没有重名并且isReserved返回false的话,就接着执行proxy方法
```ecmascript 6
const sharePropertyefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}
export function proxy(target: Object, sourceKey: string, key: string) {
  sharePropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
这里其实是做了一层代理,先是定义一个属性描述符sharedPropertyDefinition，然后调用Object.defineProperty意思是当访问/修改target.key时会触发get/set,代理到this[sourceKey][key](即vm[_data][key])上
    
    在initData中将data保存到vm._data中
    接着是调用observe对数据做了响应式处理.
    最后一步是判断vm.$options.el是否存在,也即传入的对象是否有el属性,有的话就调用vm.$mount进行挂载,挂载的目标就是把模版渲染成最终的DOM
    
总结:
    执行new Vue其实是执行_init进行了一系列初始化的操作.最后调用vm.$mount进行挂载,这一步是数据渲染到DOM上的关键
        













