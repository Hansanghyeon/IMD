/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let result;
  function createResult(first, second, listNext) {
    console.log(first.val);
    console.log(second.val);
    if(first.next && second.next) {
      listNext = new ListNode(first.val + second.val);
    }
    else {
      console.log(result)
      return result
    };
    createResult(first.next, second.next, listNext.next);
  }
  console.log(createResult(l1, l2, result));
};
// @lc code=end

