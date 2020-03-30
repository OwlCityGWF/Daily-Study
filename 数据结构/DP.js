/**
 * 动态规划是一种将复杂问题分解成更小的子问题来解决的优化技术
 * (1)定义子问题
 * (2)实现反复执行而解决子问题的部分
 * (3)识别并求解出边界条件
 * 如: 背包问题： 给出一组项目,各自有值和容量,目标是找出总值最大的项目的集合。这个问题的限制是
 * 总容量必须小于等于"背包"的容量.
 * 最长公共子序列: 找出一组序列的最长公共子序列(可由另一序列删除元素但不会改变余下元素但的顺序而得到).
 * 矩阵链相乘: 给出一系列矩阵,目标是找到这些矩阵相乘的最高效办法(计算次数尽可能少).相乘操作不会进行,解决方案
 * 是找到这些矩阵各自相乘的顺序.
 * 硬币找零: 给出面额为d1...dn的一定数量的硬币和要找零的钱数,找出有多少种找零的方法.
 * 图的全源最短路径: 对所有顶点对(u,v),找出从顶点u到顶点v的最短路径.
 *
 * 动态规划和分而治之(归并和快排是分治思想)是不同的方法: 分治是把问题分解成相互独立的子问题，然后组合它们的答案
 * 而动态规划则是将问题分解成相互依赖的子问题.
 * @param coins
 * @constructor
 */
function MinCoinChange(coins) {
	var coins = coins;
	var cache = {};
	
	this.makeChange = function (amount) {
		var me = this;
		if (!amount) {
			return [];
		}
		if (cache[amount]) {
			return cache[amount];
		}
		var min = [], newMin, newAmount;
		for (var i = 0; i < coins.length; i++) {
			var coin = coins[i];
			newAmount = amount - coin;
			if (newAmount >= 0) {
				newMin = me.makeChange(newAmount);
			}
			if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
				min = [coin].concat(newMin);
				console.log('new Min ' + min + ' for ' + amount);
			}
		}
		return (cache[amount] = min);
	};
}

var minCoinChange = new MinCoinChange([1,5,10,25]);
console.log(minCoinChange.makeChange(36));

/**
 * 贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择(当前最好的解)
 * 从而达到全局的最优(全局最优解).它不像动态规划那样计算更大的格局
 * @param coins
 * @constructor
 */
function MCoinChange(coins) {
	var coins = coins;
	
	this.makeChange = function (amount) {
		var change = [],
			total = 0;
		for (var i = coins.length; i >=0; i--) {
			var coin = coins[i];
			while (total + coin <= amount) {
				change.push(coin);
				total += coin;
			}
		}
		return change;
	};
}

var minCoinChange1 = new MCoinChange([1,5,10,25]);
console.log(minCoinChange1.makeChange(36));
