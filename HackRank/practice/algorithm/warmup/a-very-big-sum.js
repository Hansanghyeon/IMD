/**
 * https://www.hackerrank.com/challenges/a-very-big-sum/problem?h_r=next-challenge&h_v=zen&isFullScreen=true&h_r=next-challenge&h_v=zen
 */

function aVeryBigSum(ar) {
  return ar.reduce((a,b) => a+b, 0);
}