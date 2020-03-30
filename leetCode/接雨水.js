/*
* 给定n个非负整数表示每个宽度为1的柱子的高度图，计算按此排列的柱子，下雨后能接多少雨水
 */
/*
* 解法一:动态规划降维[双指针]+按列求和
* left_max,right_max无需定义数组存储
* 每次只用到当前列前一个左右的最大高度
* 直接维护更新两个变量即可
 */
/**
 * @param height
 * @returns {number}
 */
var trap = function (height) {
  if (!height || height.length == 0) {
    return 0;
  }
  let sum = 0;
  let n = height.length;
  let left = 0;
  let right = n - 1;
  let left_max = 0;
  let right_max = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] < left_max) {
        sum += left_max - height[left];
      } else {
        left_max = height[left];
      }
      left++;
    } else {
      if (height[right] < right_max) {
        sum += right_max - height[right];
      } else {
        right_max = height[right];
      }
      right--;
    }
  }
  return sum
};
