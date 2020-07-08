/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let result = 0;
  let compareString = "";

  s.split("").forEach((e, index) => {
    if (compareString.indexOf(e) === -1) {
      compareString += e;
      console.log(compareString);
    } else if (compareString.length > result) {
      result = compareString.length;
      compareString = "";
    }
  });

  if (compareString.length > result) {
    result = compareString.length;
    compareString = "";
  }

  return result;
};
// @lc code=end
