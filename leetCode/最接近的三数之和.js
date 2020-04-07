/*
* 题目描述
* 给定一个包括n个整数的数组nums和一个目标值target。找出nums中的三个数,使得它们的和与target最接近.返回这这三个数的和,假定每组输入只存在唯一答案
*  例如,给定数组 nums = [-1,2,1,-4]，和target = 1,与target最接近的三个数的和为2. (-1 + 2 + 1 = 2)
 */

/*
* 思路:
* 双指针法
* 1.确定第一个数,在左右指针移动过程中,更新与target差值最小的结果
* 2.技巧
*   排序原数组
*   nums[right]>=nums[left],确定一个数x, res = x + nums[left] + nums[right]，当sum - target < res - traget时,res = sum;
*   当sum == target时,返回sum即为所求,当sum>targte根据从小到大的排序方式.左右指针不能再增大.只有右指针能够缩小,进而缩小sum值.right--
*   当sum < target
*   原理同上,只不过从小的元素累加起 left++
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let res = nums[0] + nums[1] + nums[2];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(res - target) > Math.abs(sum - target)) {
        res = sum;
      } else if (sum > target) {
        right--;
      } else if (sum < target) {
        left++;
      } else if (sum === target) {
        return res;
      }
    }
  }
  return res;
};
let arr = [-1,2,1,-4];
let target = 1;
let a = threeSumClosest(arr, target);
console.log(a);
