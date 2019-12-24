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
  let result = [];
  for(let i in nums) {
    for(let z in nums) {
      if(i < z) {
        if(nums[i] + nums[z] === target) {
          result.push(i, z);
        }
      }
    }
  };
  return result;
};
// @lc code=end

