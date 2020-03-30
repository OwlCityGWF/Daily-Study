/*
* 给你n个非负整数a1,a2，..., an每个数代表坐标中的一个点(i,a)。在坐标内画n条垂直线
* 垂直线i的两个端点分别为(i,a)和(i,o).找出其中的两条线，使得它们与x轴共同构成的容器可以容纳最多的水
* 解题思路:
* 设第一条线的下标为数组中的l,第二条线为r。
* 容器的面积实际就是(r-l)*Math.min(height[l], height[r])的最大值
* 双指针法:
* 设置双指针l和r分别位于容器的一头一尾，根据规则移动指针，并且更新面积最大值maxS
* 直到l == r时返回maxS
* 1.考虑输入的数组长度为0,1,2的情况
* 2.设置双指针l和r分别位于容器的一头一尾
* 3.使用while循环,当l == r时结束循环
* 4.判断每次height[l]和height[r]的高度,若是后者大,则指针l向前移动,反之则移动r；
* 5.其实本质就是在移动的过程中不断消去不可能成为最大值的状态
 */
var maxArea = function (height) {
  let i = 0, j = height.length - 1;
  let square, max = 0;
  while (j - i >= 1) {
    if (height[i] > height[j]) {
      square = height[j] * (j - i);
      j--;
    } else {
      square = height[i] * (j-i);
      i++;
    }
    max = Math.max(square, max);
  }
  return max;
};


