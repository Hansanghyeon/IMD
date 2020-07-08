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
  const result = [];
  if (s.length === 1) return 1;
  if (!s) return 0;
  const result2 = s.split("").reduce((acc, cur) => {
    if (!acc) return (acc = "");
    if (acc.indexOf(cur) !== -1) {
      result.push(acc);
      acc = "";
    }
    acc += cur;
    return acc;
  });
  result.sort((a, b) => b.length - a.length);
  console.log(result, result2);
  if (result.length === 0 || result[0].length < result2.length)
    return result2.length;
  return result[0].length;
};
// @lc code=end
