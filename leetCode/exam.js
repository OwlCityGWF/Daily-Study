/**
 * 输入:["ab","c","ab","d","c"]
 * 输出:["ab1","c1","ab2","d","c2"]
 * @type {*[]}
 */
let arr = ["ab", "c", "ab", "d", "c"];
let reverseArr = arr.reverse();
let a, b;
let result = [];
for (let i = 0; i < arr.length; i++) {
	a = arr[i];
	for (j = 0; j < reverseArr.length; j++) {
		b = reverseArr[j];
	}
	
	if (a === b) {
		console.log(a);
	}
}

/**
 * 一.现在有一个字符串，你要对这个字符串进行 n 次操作，
 * 每次操作给出两个数字：(p, l) 表示当前字符串中从下标为 p 的字符开始的长度为 l 的一个子串。
 * 你要将这个子串左右翻转后插在这个子串原来位置的正后方，求最后得到的字符串是什么。
 * 字符串的下标是从 0 开始的，你可以从样例中得到更多信息。
 */

// 二.输入描述:
// 	每组测试用例仅包含一组数据，每组数据第一行为原字符串，长度不超过 10 ，仅包含大小写字符与数字。接下来会有一个数字 n 表示有 n 个操作，再接下来有 n 行，每行两个整数，表示每次操作的(p , l)。
//
//
//
// 保证输入的操作一定合法，最后得到的字符串长度不超过 1000。
//
//
// 输出描述:
// 	输出一个字符串代表最后得到的字符串。

// 输入例子1:
// 	ab
// 2
// 0 2
// 1 3
//
// 输出例子1:
// 	abbaabb

// 三.字符串自动校对（修正拼写错误字符串）
// 题目描述：（1）三个同样的字母连在一起，一定是拼写错误，去掉一个就好了，比如：helllo->hello；（2）两对一样的字母（AABB型）连在一起，一定是拼写错误，去掉第二对的一个字母就好了：比如：helloo->hello；（3）上面的规则优先“从左到右匹配”，即如果是AABBCC，虽然AABB和BBCC都是错误拼写，应该优先考虑修复AABB，结果为AABCC
//
// 输入描述：第一行包括一个数字N，表示本次用例包括多少个待校验的字符串。后面跟随N行，每行为一个待校验的字符串。
//
// 输出描述：N行，每行包括一个被修复后的字符串。


// 四.货币找余
//
// 题目描述：Z国的货币系统包含面值1元、4元、16元、64元共计四种硬币，以及面值1024元的纸币。现在小Y使用1024元的纸币购买了一件价值为N的商品，请问最少他会收到多少硬币。
//
//     输入格式：共一行，包含整数N。
//
//     输出格式：共一行，包含一个数，表示最少收到的硬币数。
//
//     数据范围：0<N≤1024
//
// 输入样例：200
//
// 输出样例：17
//
// 样例解释：花200，需要找零824块，找12个64元硬币，3个16元硬币，2个4元硬币即可

