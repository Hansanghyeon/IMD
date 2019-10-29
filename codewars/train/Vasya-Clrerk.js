/*
 *? 문제: 티켓판매원이 0원에서 시작해서 25원짜리 티켓을 팔고있다
 *? 다만 문제는 판매한 돈으로 거스름 돈을 주어야한다. 25원어치를 팔고
 *? 100원을 받아서 75원을 거스름 돈으로 주어야할때 "NO"를 리턴하고
 *? 아무문제없이 모든 티켓을 판매한다면 "YES"를 리턴해야한다.

 ** 어떻게하면 조건문과, 반복문만으로 사용하지않고
 * 좀더 깔끔하고 단축된 문법으로 이 문제를 해결할 수 있을까?
 *
 * 20191030 - 오늘은 모두 조건문을 통해서 구분하려하니까 너무많은
 * 조건문때문에 관리하기가 어렵다. 그래서 코드도 다짜지못함
 *
 TODO: for..of 문을통해서 내부는 스위치문을 통해 관리하면 좀더 짧고
  가독성있는 코드를 작성할 수 있을 것같다.
 */

function tickets(peopleInLine){
  // 결과
  let result = '';
  // 지폐구분
  let momney = {
    '25' : 0,
    '50' : 0,
    '100' : 0
  };
  // 비용
  const cost = 25;
  for(let pay of peopleInLine) {
    // 잔돈반환기준
    if(pay > 25) {
      let a = pay - cost;
      // 가지고있는 큰지폐부터 반환
      if(pay >= 100) {
        momney['100'] = hundred(a, momney['100']);
        result = hundred(a, momney['100']).result === undefined ? '' : "NO";

      }
      if(pay < 100 && pay >= 50) {

      }
    } else if(pay === 25) {
      momney["25"]++
    } else {
      // 오류 구분
      result = "NO";
    }
  }

  return result;
}
function hundred(pay, momeny) {
  let count = Number((pay / 100).toFixed(0));
  let bill = momeny - count;
  let hay = Number(pay) - (count * 100);
  if(bill < 0) {
    return {result : "NO"};
  } else {
    return {hay, bill}
  }
}

// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

// assertEquals(tickets([25, 25, 50, 50]), "YES");
assertEquals(tickets([25, 100]), "NO");
