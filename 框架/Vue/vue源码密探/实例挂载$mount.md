### 前情回顾
```ecmascript 6
Vue.prootype._init = function(options?: Object) {
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}
```
### 实例挂载流程
```ecmascript 6
// 运行时版本mount方法
Vue.prototype.$mount = function(el?: string | Element, hydrating?:boolean): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}
```
```ecmascript 6
// 而在完整版的Vue中,$mount的函数被重写
// src/platforms/web/entry-runtime-with-compiler.js
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function(
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  // ...

  return mount.call(this, el, hydrating);
};
```
```ecmascript 6
// query方法实现
export function query(el: string | Element): Element {
  if (typeof el === "string") {
    const selected = document.querySelector(el);
    if (!selected) {
          process.env.NODE_ENV !== "production" &&
            warn("Cannot find element: " + el);
          return document.createElement("div");
        }
    return selected;
  } else {
        return el;
  }
}
// 如果el是一个字符串,就调用querySelector获取节点并返回;如果节点不存在就抛出警告并创建一个div节点.如果el是一个节点就直接返回
```
```ecmascript 6
/* istanbul ignore if */
if (el === document.body || el === document.documentElement) {
  process.env.NODE_ENV !== "production" &&
    warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    );
  return this;
}
```
检查el是不是根节点(html,body)如果是就抛出警告并停止挂载
    
    因为挂载实际上就是把el节点替换为组件的模版,因此vue是不能挂载在body，html这样的根节点上的
```ecmascript 6
const options = this.$options;
if (!options.render) {
  let template = options.template;
  if (template) {
    // [1]
  } else if (el) {
    template = getOuterHTML(el);
  }
  // [2]
}
// 首先判断render函数是否存在,如果未定义则需做进一步处理
```   
### Watcher实例
       watcher会解析表达式,收集依耐关系,并且在表达式的值发生改变时触发回调.watcher在这里主要有两个作用:一个是初始化的时候会执行回调函数;另一个是当vm实例中监测的数据发生变化的时候执行回调函数,而回调函数就是传入的updateComponent函数
       mountComponent函数
```ecmascript 6
if (vm.$vnode == null) {
  vm._isMounted = true;
  callHook(vm, "mounted")
}
return vm;
```   
函数最后判断为根节点的时候设置vm._isMounted为true,表示这个实例已经挂载2了,同时执行mounted钩子函数
这里vm.$vnode表示Vue实例的父虚拟Node,所以它为Null则表示当前是根Vue实例














     
