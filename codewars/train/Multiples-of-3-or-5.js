/**
 * 3또는 5의 배수인 10 미만의 모둔 자연수를 나열하면 3,5,6 및 9가 됩니다.
 * 이 배수의 합은 23입니다. 전달 된 숫자 아래 3 또는 5의 모둔 배수의 합을
 * 반환하도록 하는 솔루션을 완료하십시오.
 *
 * > 참고: 수의 배수중 3,5 배수에 모두속하면 한번만 계산
 */

function solution(number){
  let multiple = new Set();
  for(let i = 1; i < number; i++) {
    let result3 = i % 3;
    let result5 = i % 5;
    if(result3 === 0 || result5 === 0) multiple.add(i);
  }
  console.log(multiple);
  let values = multiple.values();
  let sum = 0;
  for(let i = 0; i < multiple.size; i++) {
    sum += values.next().value;
  }
  console.log(sum);
  return sum;
}
solution(10);