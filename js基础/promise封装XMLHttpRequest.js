// // function getJSON(url) {
// // 	return new Promise(function (resolve, reject) {
// // 		var XHR = new XMLHttpRequest();
// // 		XHR.open('GET', url, true);
// // 		XHR.send();
// //
// // 		XHR.onreadystatechange = function () {
// // 			if (XHR.readyState == 4) {
// // 				if (XHR.status == 200) {
// // 					try {
// // 						var response = JSON.parse(XHR.responseText);
// // 						resolve(response);
// // 					} catch (e) {
// // 						reject(e);
// // 					}
// // 				} else {
// // 					reject(new Error(XHR.statusText))
// // 				}
// // 			}
// // 		}
// // 	})
// // }
// //
// // getJSON(url).then(res => console.log(res));
// /**
//  * 如何判断一个对象是{}
//  * @type {{}}
//  */
// /**
//  * 1.将json对象转化为json字符串,再判读该字符串是否为"{}"
//  * @type {{}}
//  */
// let a = {};
// let b = (JSON.stringify(a) == "{}");
// console.log(b);
// /**
//  * 2.for in循环判断
//  */
// // var obj = {};
// // var b = function () {
// // 	for (var key in obj) {
// // 		return false;
// // 	}
// // 	return true;
// // };
// // console.log(b());
//
// /**
//  * Object.getOwnPropertyNames()方法
//  * 此方法是使用Object对象的getOwnPropertyNames方法,获取到对象中的属性名,存到一个数组中,返回数组对象
//  * 我们可以通过判断数组的length来判断对象是否为空.
//  */
// var data = {};
// var arr = Object.getOwnPropertyNames(data);
// console.log(arr.length == 0);
//
// /**
//  * 使用ES6的Object.keys()方法
//  * 返回值也是对象中属性名组成的数组
//  */
// var data = {};
// var arr = Object.keys(data);
// console.log(arr.length == 0);
// /**
//  * jquery的isEmptyObject()方法
//  * 是将(for in)进行封装,使用时需要依赖jquery
//  */
// // var data = {};
// // var b = $.isEmptyObject(data);
// // console.log(b);
//
//
//
//
// /**
//  * reduce()的入参
//  * reduce((prev,current,index, arr) => {
//  *
//  * }, initalValue);
//  * initalValue为默认参数,代表数组的第一个元素
//  */
// /**
//  * replace()的入参
//  */
// /**
//  * AST(抽象语法树)
//  * 是源代码的抽象语法结构的树状表现形式.而vue就是将模版代码映射为
//  * AST数据结构,进行语法解析。
//  * ASTNode分几种不同类型,定义在flow/compile.js里面.
//  * 真实DOM存在什么问题?为什么要用虚拟DOM？
//  * 因为document.createElement这个方法创建的真实DOM元素会带来性能上的损失。
//  * 会创建很对属性，而这些属性有90%多是无用多。VNode就是简化版的真实DOM元素,比如属性elm，只包括我们需要的属性,并新增了一些在diff过程中需要使用的属性
//  * 例如isStatic
//  * 首先从$mount开始,可以看到,mount其实就是拿到了html模版作为template,然后将这个template通过compileToFunctions方法编译成render函数
//  *
//  **/
// /**
//  * VNode数据结构
//  */
// constructor (
// 	tag?: string,
// 	data?: VNodeData,
// 	children?: ?Array<VNode>,
// 	text?: string,
// 	elm?: Node,
// 	context?: Component,
// 	componentOptions?: VNodeComponentOptions,
// 	asyncFactory?: Function
// ) {
// 	this.tag = tag
// 	this.data = data
// 	this.children = children
// 	this.text = text
// 	this.elm = elm
// 	this.ns = undefined
// 	this.context = context
// 	this.fnContext = undefined
// 	this.fnOptions = undefined
// 	this.fnScopeId = undefined
// 	this.key = data && data.key
// 	this.componentOptions = componentOptions
// 	this.componentInstance = undefined
// 	this.parent = undefined
// 	this.raw = false
// 	this.isStatic = false
// 	this.isRootInsert = true
// 	this.isComment = false
// 	this.isCloned = false
// 	this.isOnce = false
// 	this.asyncFactory = asyncFactory
// 	this.asyncMeta = undefined
// 	this.isAsyncPlaceholder = false
// }
//
// if (template) {
// 	if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
// 		mark('compile');
// 	}
//
// 	const { render, staticRenderFns } = compileToFunction(template, { //对获取到的template进行编译
// 		shouldDecodeNewlines,
// 		shouldDecodeNewlinesForHref,
// 		delimiters: options.delimiters,
// 		comments: options.comments
// 	}, this);
// 	options.render = render;
// 	options.staticRenderFns = staticRenderFns;
//
// 	if (procee.env.NODE_ENV !== 'production' && config.performance && mark){
// 		mark('compile end');
// 		measure(`vue ${this._name} compile`, 'compile end');
// 	}
// 	/**
// 	 * compileToFunctions主要将template编译成render函数.首先读缓存,没有缓存就调用compule方法拿到render函数的字符串形式
// 	 * 再通过new Function的方式生成render函数
// 	 */
// 	//有缓存的话就直接在缓存里面拿
// 	const key = options && options.delimiters ? String(options.delimiters) + template : template;
// 	if (cache[key]) {
// 		return cache[key]
// 	}
// 	const res = {};
// 	const compiled = compile(template, options);
// 	res.render = makeFunction(compiled.render);
// 	const l = compiled.staticRenderFns.length;
// 	res.staticRenderFns = new Array();
// 	for (let i = 0; i < l; i++) {
// 		res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
// 	}
// }
// return (cache[key] = res) //记录至缓存
//
// /**
//  * compile方法，就是将template编译成render函数的字符串形式.
//  */
// export function compile(
// 	template: string,
// 	options: CompilerOptions
// ): CompiledResult {
// 	const AST = parse(template.trim(), options);
// 	optimize(AST, options);
// 	const code = generate(AST, options)
// 	return {
// 		AST,
// 		render: code.render,
// 		staticRenderFns: code.staticRenderFns
// 	}
// }
//
// /**
//  * compile方法主要由三个函数组成
//  * parse输出AST语法树
//  * optimize输出staticRenderFns的对象
//  * generate输出render函数的字符串
//  * parse函数
//  *  主要功能是将template字符串解析成AST，前面定义了ASTElement的数据结构,parse函数就是将template里的
//  * 结构(指令,属性,标签等)转换为AST形式存进ASTElement中,最后解析生成AST.
//  * optimize函数(src/compiler/optimizer.js)
//  *  主要功能就是标记静态节点,为后面patch过程中对比新旧VNode树形结构做优化.
//  * 被标记为static的节点在后面的diff算法中会被直接忽略掉.
//  * generate函数(src/compiler/codegen/index.js)
//  *  主要功能就是根据AST结构拼接生成render函数的字符串
//  *  1.parse(解析器)
//  *  在parse函数中,定义非常多的全局属性以及函数，然后调用了parseHTML函数，这个函数会不断的解析模版,填充root
//  *  最后把root(AST)返回回去
//  *  vue通过正则表达式匹配开始结束标签，标签名，属性等等
//  *
//  */
// const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// const ncname = '[a-zA-Z_][\\w\\-\\.]*';
// const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// const startTagOpen = new RegExp(`^<${qnameCapture}`);
// const startTagClose = /^\s*(\/?)>/;
// const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// const doctype = /^<!DOCTYPE [^>]+>/i;
// const comment = /^<!\--/;
// const conditionalComment = /^<!\[/;
// /**
//  * 重要的是while循环,在while循环里不断调用html.indexOf('<'）去匹配，然后根据返回的索引的不同去做不同的解析处理.
//  */
//
// /**
//  * vue模版编译过程
//  * 通过compile编译器把template编译成AST语法树,AST会经过generate(将AST语法树转化成render function字符串的过程)
//  * 得到render函数,render的返回值是VNode,VNode是Vue的虚拟DOM节点,里面包含(标签名,子节点,文本等)；
//  * 然后进行真实dom渲染.
//  * 1.首先compile编译器,通过Parse()方法将我们传入的template中的内容
//  * 转换为AST语法树.
//  * 2.optimize对当前抽象语法树进行优化,标识出静态节点.
//  * 3.generate将我们的抽象语法树,转换为对应的render方法字符串,返回虚拟DOM.
//  *
//  */
// /**
//  * webSocket的用法
//  */
// /**
//  * svg用法echart.js,D3.js,highchart.js区别
//  * Highcharts 基于SVG，方便自己定制，但图表类型有限。
//  * Echarts 基于Canvas，适用于数据量比较大的情况。
//  * D3.v3 基于SVG，方便自己定制；D3.v4支持Canvas+SVG，如果计算比较密集，也可以选择用Canvas
//  */
