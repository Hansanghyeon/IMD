/*
높이가 제각각인 초를 케익에 적용한다
주체자는 제일 높은 초만 꺼트릴수 있는데 이때
꺼트린 초의 갯수는 몇개인가?

sample input
4
3 2 1 3
sample output
2
 */

/*
내가 생각한 해결방법
각 대입된 숫자들의 제일 큰 순서대로 키를가지고있는
객체를 만들어서 순서대로 만든다.
그리고 제일 큰 숫자의 요소 수를 세어서 리턴한다.
 */

// Complete the birthdayCakeCandles function below.
function birthdayCakeCandles(ar) {
  let resultMap = {};
  ar.sort((a,b) => {
    return a - b;
  });

  for(let i in ar) {
    if(!(ar[i] in resultMap)) resultMap[ar[i]] = [];
    resultMap[ar[i]].push(ar[i]);
  }
  console.log(resultMap[ar[ar.length - 1]].length);
  return resultMap[ar[ar.length - 1]].length;
}

// sample test code
birthdayCakeCandles([18,90,90,13,90,75,90,8,90,43]);
birthdayCakeCandles([1000, 1000, 1000]);


/*
테스트 실패한 case
9만999개의 1000높이의 촛대.
999높이의 1개의 촛대로 이루어진 배열

---

sort에서 순서함수를 안정해줘서....
 */
let input8test = [];
for(let i = 0; i < 100000; i++) {
  i === 0 ? input8test.push(999) : input8test.push(1000);
}
birthdayCakeCandles(input8test);