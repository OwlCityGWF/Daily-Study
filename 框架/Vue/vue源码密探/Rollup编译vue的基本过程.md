### flow
    flow静态类型检查工具.vue2.0重构时除了ESLint保证代码风格,引入flow做静态类型检查
### flow在vue.js中的应用
- 类型推断: 通过变量的使用上下文来推断出变量的类型，然后根据这些推断来检查类型
- 类型注释：事先注释好我们期待的类型,flow会基于这些注释来判断
### vue2.0源码目录结构及含义
    compiler->core->platforms->server->sfc->shared
- compiler(编译相关)


    codegen 代码生成,把AST(抽象语法树)转换为render函数
    directives 转换为render函数前要执行的指令
    parser 把模版解析为AST
compiler目录包vue.js所有编译相关的代码,将template模版编译为render函数
在vue中使用render函数来创建VNode,而在开发的时候我们更多的是使用template来编写HTML，所以需要将template编译为render函数.
编译工作可以在构建项目的时候借助webpack，vue-loader等插件来完成,也可以在项目运行时使用vue的构建功能来完成。相对应的构建输出有runtime和runtime-with-compiler两个版本.由于编译是一项消耗性能的工作,因此推荐使用第一种方式

- core核心代码


    components 全局通用组件keep-alive
    global-api 全局api，即vue对象上的方法,如extend,mixin,use等
    instance vue实例化相关代码,如初始化,事件,渲染,生命周期等
    observer 响应式数据修改代码
    util 工具函数
    vdom 虚拟DOM相关代码
- platforms(不同平台的支持)

    
    web平台compiler编译时相关，runtime运行时相关，server服务端渲染相关，util工具函数
    weex 配合weex运行在native平台
    server目录下存放的是与服务器渲染相关的代码,这些代码运行在服务器done环境
    sfc的parser.js是一个解析器,用于将.vue文件解析生成一个js对象
    shared定义常量和工具函数,供其他文件引用
### Rollup
    rollup相对于webpack更加轻量,它只处理js文件而不处理其他静态资源文件,打包出来的文件体积也更小，因此rollup更适用于像类库这种只有js代码的项目构建.
### 构建过程
```ecmascript 6
// 引入所需模块
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const terser = require('terser');
// 检查是否存在dist目录,不存在则创建dist目录
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
[1]
let builds = require('./config').getAllBuilds();
[2]
if (process.argv[2]) {
  const filters = process.argv[2].split(',');
  builds = builds.filter(b => {
  return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)  
  })
} else {
  builds = builds.filter(b=> {
  return b.output.file.indexOf('weex') === -1  
})
}
build(builds);
function build(builds) {
  
}
```

```ecmascript 6
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGEt)
} else {
  exports.getBuild = genConfig
  exports.getAllBuild = () => Object.keys(builds).map(genConfig);
}
```
这里getAllBuilds函数的处理是取出builds对象的所有属性组成的数组在genConfig函数处理后返回,builds对象的定义如下
```ecmascript 6
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.js'),
    format: 'es',
    transpile: false,
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.min.js'),
    format: 'es',
    transpile: false,
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  }
  // 这里只列出了部分代码，weex、ssr部分未列出
}
```
    builds对象是一个个结构相似的对象，对应编译不同vue版本的配置
    配置对象里面的format表示构建出来的vue的各种格式(如CommonJs，ESModule等)。entry代表入口文件,dest代表目标文件.这两个属性都是调用resolve方法并传入一个路径参数.
```ecmascript 6
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1 ))  
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```
resolve引用aliases。
```ecmascript 6
// scripts/alias.js
const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```
alias对象是路径别名到真实路径的映射
    
    比如builds对象中的web-full-dev，它的entry值为web/entry-runtime-with-cpmpiler.js.调用resolve后会先提取出web这个别名,到alias对象去找,而web别名对应的真实路径是../src/platforms/web，与文件名entry-runtime-with-compiler.js拼接后得到了文件的完整真实路径../src
    /plactforms/web/entry-runtime-with-compiler.js
    由于web-full-de的dest的别名部分dist并没有出现在alias对象中，所以会走resolve的else逻辑,直接返回路径../dist/vue.js
    
    getAllBuilds函数中builds对象每个属性都执行了genComfig函数
```ecmascript 6
function genConfig(name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, alias, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    } 
  }
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}` = featureFlags[key]]
  })
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars));
  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }
  Object.defineProperties(config, '_name', {
    enumerable: false,
    value: name
  })
  return config;
}
```    
这个函数的功能是把builds里面的配置对象转换为一个Rollup对应需要的配置对象

以上是[1]处代码的执行流程
看一下[2]处代码
```ecmascript 6
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  builds = builds.filter(b => {
  return b.output.file.indexOf('weex' === -1)  
})
}
```

















