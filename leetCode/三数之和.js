/*
* 给你一个包含n个整数的数组nums，判断nums中是否存在三个元素a,b,c使得a+b+c = 0?
* 给定数组 nums = [-1, 0, 1, 2, -1, -4];
* [
*   [-1,0,1],
*   [-1,-1,2]
* ]
* 思路
*  首先对数组进行排序,排序后固定一个数nums[i],再使用左右指针指向nums[i]后面对两端,数字分别为nums[L]和nums[R]，计算三个数的
*  和sum判断是否满足为0,满足则添加进结果集
*  如果nums[i]大于0，则三数之和必然无法等于0.结束循环
*  如果nums[i] == nums[i-1],则说明该数字重复，会导致结果重复，所以应该跳过
*  当sum == 0时,nums[L] == nums[L +1]则会导致结果重复,应该跳过,L++
*  当sum == 0时,nums[R] == nums[R-1]则会导致结果重复,应该跳过,R--
*  时间复杂度:O(n平方) n为数组长度
 */
var threeSum = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i-1]) continue;
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++;
        while (L < R && nums[R] == nums[R - 1]) R--;
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};
