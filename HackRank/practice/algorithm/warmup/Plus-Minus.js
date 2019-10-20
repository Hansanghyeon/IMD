/*
주어진 배열의 (양수의 비율, 음수의 비율, 0의 비율) 을 결과물로 나타내는
함수를 작성하여라

ex
arr = [1,1,0,-1,-1]
2/5, 2/5, 1/5
 */

// Complete the plusMinus function below.
function plusMinus(arr) {
  let denomiator = arr.length;
  let plus = [];
  let zero = [];
  let minus = [];
  for(let item of arr) {
    if(item > 0) plus.push(item);
    else if(item < 0) minus.push(item);
    else zero.push(item);
  }
  console.log((plus.length/denomiator).toFixed(6));
  console.log((minus.length/denomiator).toFixed(6));
  console.log((zero.length/denomiator).toFixed(6));
}