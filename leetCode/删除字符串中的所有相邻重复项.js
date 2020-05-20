// // /**
// //  * 利用栈: 遍历字符串，依次入栈,入栈时判断与栈头元素是否一致，如果一致，则需要将栈头元素出栈，并且当前元素也无须入栈.
// //  * 1.遍历字符串，取出栈头字符，判断当前字符与栈头字符是否一致
// //  * 不一致，栈头字符进栈，当前字符进栈
// //  * 一致，都不需要进栈，直接进入下次遍历即可.
// //  */
// // var removeDuplicates = function (S) {
// //   let stack = [];
// //   for(c of S) {
// //     let prev = stack.pop();
// //     if (prev !== c) {
// //       stack.push(prev);
// //       stack.push(c);
// //     }
// //   }
// //   return stack.join('');
// // }
// const arr1 = ['a', 'b', 'c'];
// const arr2 = ['b', 'c', 'a'];
//
// console.log(arr2.sort() ===  arr1.sort());
// console.log(
//   arr1.sort() === arr1,
//   arr2.sort() == arr2,
//   arr1.sort() === arr2.sort()
// );
// const mySet = new Set([{ a: 1 }, { a: 1 }]);
// const result = [...mySet];
// console.log(result);
// const arr = [
//   x => x * 1,
//   x => x * 2,
//   x => x * 3,
//   x => x * 4
// ];
//
// console.log(arr.reduce((agg, el) => agg + el(agg), 1));
//
// const notifications = 1;
//
// console.log(
//   `You have ${notifications} notification${notifications !==
//   1 && 's'}`
// );

var a = 1;
function test() {
  console.log(a);
  let a = 2;
}

test();
