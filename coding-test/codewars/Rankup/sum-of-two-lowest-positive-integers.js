// 숫자로 된 배열안에서 제일 낮은 값 2가지를 찾아서 그 값을 더해주는 문제
//
// Array.prototype.sort 로 해결했다.
// sort() 의 compareFunction를 제공해서 a, b를 비교할수있는 함수를 넣어줄 수 있다.

function sumTwoSmallestNumbers(numbers) {
  //Code here
  numbers.sort((a,b) => {
    return a - b;
  });
  return numbers[0] + numbers[1];
}