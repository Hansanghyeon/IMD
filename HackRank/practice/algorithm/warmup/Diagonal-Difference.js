/**
 * arr은 메트릭스 형태의 배열이다
 * 3 * 3의 메트릭스 가 있을때
 * 각각 대각선의 값들의 합을 도출해내면 된다.
 * [row][row] - 반대 대각선
 * 합의 절댓값!
 * @param arr
 */

// 예제 테스트 배열
// arr = [ [ 11, 2, 4 ], [ 4, 5, 6 ], [ 10, 8, -12 ] ]

function diagonalDifference(arr) {
  // Write your code here
  let mainSum = 0;
  let secondSum = 0;
  let num = arr.length;
  for(let i = 0; i < num; i++) {
    mainSum += arr[i][i];
    secondSum += arr[i][num - 1 - i];
  }
  return Math.abs(mainSum - secondSum);
}