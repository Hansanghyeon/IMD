/**
 * https://www.hackerrank.com/challenges/a-very-big-sum/problem?h_r=next-challenge&h_v=zen&isFullScreen=true&h_r=next-challenge&h_v=zen
 */

/**
 * reduce() 메서드는 배열의 각 요소에 대해 주어진 함수를 실행하고. 하나의 결과값을 반환
 * 실행함수 = (accumulator, currentValue) => accumulator + currentValue;
 *  실행함수는 네 개의 인자를 가진다.
 * @param ar
 * Array
 * @returns {*}
 * 배열의 합을 반환
 */

function aVeryBigSum(ar) {
  return ar.reduce((a,b) => a+b, 0);
}