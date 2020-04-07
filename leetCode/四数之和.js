/*
* 题目描述
* 给定一个包含n个整数的数组nums和一个目标值target，判断nums中是否存在四个元素a,b,c和d，使得a+b+c+d的值与target相等
* 找出所有满足条件且不重复的四元组
 */
/*
* 示例:
* 给定数组 nums = [1,0,-1,-2,2],和target = 0;
* [
*   [-1, 0, 0, 1],
*   [-2, -1, 1, 2],
*   [-2, 0, 0, 2]
* ]
 */
/*
* 与最接近的三个数之和解法类似
* 这里固定两个数.另外两个数同样用移动的双指针寻找,更新比较与target的大小
* 固定的两个数用双循环
* 注意剪枝和去重
 */

var fourSum = function(nums, target) {
  let res = [];
  nums.sort((a,b) => a - b);
  let n = nums.length;
  for(let i = 0;i < n - 3;i++){
    if(i > 0 && nums[i] === nums[i-1]) continue;
    if(nums[i] + nums[i+1] + nums[i+2] + nums[i+3] > target) break;
    if(nums[i] + nums[n-1] + nums[n-2] + nums[n-3] < target) continue;
    for(let j = i + 1;j < n - 2;j++){
      if(j - i > 1 && nums[j] === nums[j-1]) continue;
      if(nums[i] + nums[j] + nums[j+1] + nums[j+2] > target) break;
      if(nums[i] + nums[j] + nums[n-1] + nums[n-2] < target) continue;
      let left = j + 1;
      let right = n - 1;
      while(left < right){
        let tmpRes = nums[i] + nums[j] + nums[left] + nums[right];
        if(tmpRes === target){
          res.push([nums[i],nums[j],nums[left],nums[right]]);
          while(left < right && nums[left] === nums[left + 1]) left++;
          while(left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        }else if(tmpRes > target){
          right--;
        }else{
          left++;
        }
      }
    }
  }
  return res;
};
