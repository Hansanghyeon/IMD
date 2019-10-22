/*
숫자 5개를 가진 배열을 받아서
각 값들을 4개씩만 더해서 제일 큰수와 제일 작은수를 만드시오
 */
// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
  let mini = 0;
  let max = 0;
  if(arr.length === 5) {
    let sorted = arr.sort((a,b) => {
      return a - b;
    });
    for(let i = 0; i < sorted.length; i++) {
      if(i > 0) max += sorted[i];
      if(i < sorted.length - 1) mini += sorted[i];
    }
  }

  // result
  console.log(mini, max);
}

console.log(
  miniMaxSum([1,3,5,7,9]), '\n',
  miniMaxSum([1,2,3,4,5]), '\n',
);