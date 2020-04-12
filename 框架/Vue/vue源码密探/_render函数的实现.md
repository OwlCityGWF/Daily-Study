### _render
Vue的_render方法是实例的一个私有方法,它用来把实例渲染成一个虚拟Node。
```ecmascript 6
Vue.prototype._render = function(): VNode {
  const vm: Component = this;
  const { render, _parentVnode } = vm.$options;
  if (_parentVnode) {
    vm.$scopedSlots = normalizeScopedSlots(
      _parentVnode.data.scopedSlots,
      vm.$slots,
      vm.$scopedSlots
    );
  }
}
vm.$vnode = _parentVnode;
let vnode;
try {
    // There's no need to maintain a stack because all render fns are called
    // separately from one another. Nested component's render fns are called
    // when parent component is patched.
    currentRenderingInstance = vm;
    vnode = render.call(vm._renderProxy, vm.$createElement);
  } catch (e) {
    handleError(e, vm, `render`);
    // return error render result,
    // or previous vnode to prevent render error causing blank component
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production" && vm.$options.renderError) {
      try {
        vnode = vm.$options.renderError.call(
          vm._renderProxy,
          vm.$createElement,
          e
        );
      } catch (e) {
        handleError(e, vm, `renderError`);
        vnode = vm._vnode;
      }
    } else {
      vnode = vm._vnode;
    }
  } finally {
    currentRenderingInstance = null;
  }
  // if the returned array contains only a single node, allow it
  if (Array.isArray(vnode) && vnode.length === 1) {
    vnode = vnode[0];
  }
  // return empty vnode in case the render function errored out
  if (!(vnode instanceof VNode)) {
    if (process.env.NODE_ENV !== "production" && Array.isArray(vnode)) {
      warn(
        "Multiple root nodes returned from render function. Render function " +
          "should return a single root node.",
        vm
      );
    }
    vnode = createEmptyVNode();
  }
  // set parent
  vnode.parent = _parentVnode;
  return vnode;
};
```
render方法的调用
```ecmascript 6
vnode = render.call(vm._renderProxy, vm.$createElement);
```
### vm._renderProxy
在生产环境下,vm._renderProxy就是vm本身;在开发环境下则调用initProxy方法,将vm作为参数传入
```ecmascript 6
// initProxy
let initProxy;
initProxy = function initProxy(vm) {
  if (hasProxy) {
    const options = vm.$options;
    const handlers = options.render && optins.render._withStripped ? getHandler : hasHandler;
    vm._renderProxy = new Proxy(vm, handlers);
  } else {
    vm._renderProxy = vm;
  }
}
```
hasProxy判断浏览器是否支持Proxy
如果直吹就创建一个Proxy对象赋给vm._renderProxy;不支持就和生产环境一样直接使用vm._renderProxy

