/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 먼저 nums에서 target의 값보다 낮은 값들만 남긴다.
  let newNums = nums.filter(num => num < target);
  // 남은 값들을 더해서 target이 되는 값을 찾는다.
  let result = [];
  for(let i in newNums) {
    for(let z in newNums) {
      if(i !== z) {
        if(newNums[i] + newNums[z] === target) {
          result.push(newNums[i], newNums[z]);
        }
      }
    }
  };
  // 찾은값을가지고 nums에 인덱스값을 찾는다.
  let filterResult = new Set(result);
  let finalResult = [];
  for(let i in nums) {
    if(filterResult.has(nums[i])) {
      let number = new Number(i);
      finalResult.push(number);
    }
  }
  return finalResult;
};
// @lc code=end

