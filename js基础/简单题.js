/**
 * key是每一个vnode的唯一id,可以依靠key,更准确,更快的拿到oldVnode中对应的vnode节点
 * 1.更准确
 * 因为带key就不是就地复用了,在sameVnode函数a.key === b.key对比中可以避免就地复用的情况，所以会更加准确.
 * 2.更快
 * 利用key的唯一性生成map对象来获取对应节点,比遍历方式更快
 * vue和react都是采用diff算法来对比新旧虚拟节点,从而更新节点.
 * 在交叉对比的时候,当新节点跟旧节点头尾交叉对比没有结果的时候,会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点.
 * (这里对应的是一个key=>index的map映射).如果没找到就认为是一个新增节点。而如果没有key，那么就会采用一种遍历查找的方法去找到对应的旧节点。
 * 3.Angualr更新dom的机制
 * 1).用户修改组件的model
 * 2).组件发出数据更改的event,angular进入检测阶段
 * 3).angular的检测从root一直到每个组件,看组件的依赖数据是否改变
 * 4).如果是的话,则更新相应的组件
 * 5).最后angular更新组件的视图.
 */
// function timeout(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve, ms, 'done');
// 	});
// }
//
// timeout(100).then((value) => {
// 	console.log(value);
// });
// for (var i = 0; i < 10; i++) {
// 	setTimeout(()=>{
// 		console.log(i);
// 	},100)
// }
/**
 * Map转Object
 * @param map
 * @returns {null}
 */
function mapToObj(map) {
	let obj = Object.create(null);
	for (let [key, value] of map) {
		obj[key] = value;
	}
	return obj
}

const map = new Map().set('name', 'An').set('des', 'JS');
console.log(mapToObj(map));

/**
 * Object转Map
 */
function objToMap(obj) {
	let map = new Map();
	for (let key of Object.keys(obj)) {
		map.set(key, obj[key])
	}
	return map;
}

let res = objToMap({'name': 'An', 'des': 'JS'});
console.log(res);

/**
 * Map转JSON
 */
function mapToJson(map) {
	return JSON.stringify([...map])
}

let map = new Map().set('name', 'An').set('des', 'JS');
mapToJson(map);

/**
 * JSON转Map
 */
function jsonToStrMap(jsonStr) {
	return objToMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"name": "An", "des": "JS"}');

