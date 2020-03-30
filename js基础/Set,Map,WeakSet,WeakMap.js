/**
 * 成员是唯一无序的，没有重复的值
 * 允许储存任何类型的唯一值，无论是原始值或者是对象引用
 * 向Set加入值时，不会发生类型转换.Set内部判断两个值是否不同,使用
 * 的算法叫做"Same-value--zero equality", 它类似于精确相等运算符(===)
 * 主要区别是NaN等于自身，而精确相等运算符认为NaN不等于自身.
 * @type {Set<any>}
 */
const s = new Set();
[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x));

for (let i of s) {
	console.log(i);
}

//去重数组的重复对象
let arr = [1, 2, 3, 2, 1, 1];
let uniqueArr = [... new Set(arr)];
console.log(uniqueArr);

let set = new Set();
let a = NaN;
let b = NaN;
console.log(a === b);
set.add(a);
set.add(b);
console.log(set);

let sett = new Set([1,2,3]);
console.log(sett.keys());
console.log(sett.values());
console.log(sett.entries());

for (let item of sett.keys()) {
	console.log(item);
}

for (let item of sett.entries()) {
	console.log(item);
}

sett.forEach((value, key) => {
	console.log(key + ':' + value);
});

console.log([...new Set([... sett])]);

let set1 = new Set([1 ,2, 3]);
let set2 = new Set([4, 3, 2]);

let intersect = new Set([...set1].filter(value => set2.has(value)));
console.log([...intersect]);

let union = new Set([...set1, ...set2]);
console.log([...union]);

let difference = new Set([...set1].filter(value => !set2.has(value)));
console.log([...difference]);

