// /**
//  * 1.防抖
//  * 触发高频事件后n秒内函数只会执行一次,如果n秒内高频事件再次被触发
//  * 则重新计算时间
//  * 思路：
//  * 每次触发事件时都取消之前都延时调用方法
//  * @param fn
//  */
// function debounce(fn) {
// 	let timeout = null;
// 	return function () {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(()=>{
// 			fn.apply(this, arguments);
// 		},500)
// 	};
// }
//
// function sayHi() {
// 	console.log('防抖成功')
// }
//
// var inp = document.getElementById('inp');
// inp.addEventListener('input', debounce(sayHi));
//
// /**
//  * 2。节流
//  * 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
//  * 思路：
//  * 每次触发事件时都判断当前是否有等待执行的延时函数
//  * @param fn
//  */
// function throttle(fn) {
// 	let canRun = true; //通过必包保存一个标记
// 	return function () {
// 		if (!canRun) return;
// 		canRun = false;
// 		setTimeout(()=>{
// 			fn.apply(this,arguments);
// 			canRun = true;
// 		}, 500)
// 	};
// }
//
// function sayHii(e) {
// 	console.log(e.target.innerWidth, e.target.innerHeight)
// }
//
// window.addEventListener('resize', throttle(sayHii));
console.log(true + false);

// let a = [1,2,3];
// a.join = a.shift;
// if(a==1&&a==2&&a==3){
// 	console.log('success')
// } else {
// 	console.log('fail')
// }


let a = {
	i : 1,
	toString: function(){
		return a.i++
	}
};
if(a==1&&a==2&&a==3){
	console.log('success')
} else {
	console.log('fail')
}

['10','10','10','10','10'].map((item,index) =>{
	console.log(item, index);
	return parseInt(item, index)
});

console.log(['10','10','10','10','10'].map(Number));

const s = new Set();
[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x));

for (let i of s) {
	console.log(i);
}

let arr = [1, 2, 3, 2, 1, 1];
console.log([...new Set(arr)]);
