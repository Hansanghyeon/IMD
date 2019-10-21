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

console.log(
`${highAndLow("1 2 3 4 5")}
${highAndLow("1 2 -3 4 5")}
${highAndLow("1 9 3 4 -5")}`
);