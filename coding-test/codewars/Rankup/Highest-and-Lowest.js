/*
주어진 숫자 + 공백으로 이루어진 문자열에서
가장 큰숫자, 가장 작은 숫자를 반환해야한다.

highAndLow("1 2 3 4 5");  // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"

 */
function highAndLow(numbers){
  // ...
  let numArray = numbers.split(' ');
  numArray.sort((a, b) => {
    return b - a;
  });
  // console.log(`"${numArray[0]} ${numArray.pop()}"`);
  return `${numArray[0]} ${numArray.pop()}`;
}

/**
 * @return {string}
 */
function BEST_highAndLow(numbers){
  // Array.prototype.map(Number)
  // Array 타입이 Number 로 지정된다.
  // 여기서 Number 로 지정하는 것은 아래에서 Math 함수를 사용하기 위해서
  // 그런것 같다.
  numbers = numbers.split(' ').map(Number);
  // Math.max.apply
  // Function.prototype.apply() 을 사용하면 숫자 **배열**에서 최대 요소를 찾음
  // apply 는 인수들의 단일 배열을 받는다는 점
  // 메트릭스와같은 배열안에 배열을 받지않는다?
  return Math.max.apply(0, numbers) + ' ' + Math.min.apply(0, numbers);
}

console.log(
`${highAndLow("1 2 3 4 5")}
${highAndLow("1 2 -3 4 5")}
${highAndLow("1 9 3 4 -5")}`
);