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
  const result = new Array();
  const stashL1 = new Array();
  const stashL2 = new Array();
  function findListNodeNull(target, baskArray) {
    baskArray.push(target.val);
    if(target.next != null) {
      findListNodeNull(target.next, baskArray);
    }
  }
  findListNodeNull(l1, stashL1);
  findListNodeNull(l2, stashL2);
  
  const sumL1 = stashL1.reverse().join().replace(/,/gi,'');
  const sumL2 = stashL2.reverse().join().replace(/,/gi,'');
  const sum = Number(sumL1) + Number(sumL2);

  const resultText = sum.toString();
  for(let i in resultText) {
    result.push(Number(resultText[i]))
  }
  console.log(result);
  console.log(result.reverse());
  console.log(result.join().replace(/,/gi,''))
  console.log(result);

  // TODO: "return type ListNode"
  // return result;
};
// @lc code=end

