/*
로마 숫자를 인수로 사용하고 그 값을 숫자 10 진수 정수로 리턴하는 함수를 작성하십시오.
로마 숫자 형식을 확인할 필요는 없습니다.

현대 로마 숫자는 가장 왼쪽 숫자부터 시작하여 0을 건너 뛰고 별도로 인코딩 할 숫자의 각 10 진수를 표현하여 작성됩니다.
따라서 1990 년은 "MCMXC"(1000 = M, 900 = CM, 90 = XC)로, 2008 년은 "MMVIII"(2000 = MM, 8 = VIII)으로 렌더링됩니다.
1666 년의 로마 숫자 "MDCLXVI"는 각 문자를 내림차순으로 사용합니다.
 */

function solution(roman){
  // complete the solution by transforming the
  // string roman numeral into an integer
  const system = {
    I:1,
    V:5,
    X:10,
    L:50,
    C:100,
    D:500,
    M:1000
  };

  let result = 0;
  let next = false;
  let temp = '';
  for(let i in roman) {
    let start = roman.length - 1 - i;
    temp += roman[start];
  }
  for(let i in temp) {
    let up = Number(i) + 1;
    if(temp[up] !== undefined && system[temp[i]] > system[temp[up]]) {
      // console.log('test');
      // console.log('temp[i]', temp[i]);
      // console.log('temp[up]', temp[up]);
      // console.log('system[temp[i]]', system[temp[i]]);
      // console.log('system[temp[up]]', system[temp[up]]);
      result += Number(system[temp[i]]) - Number(system[temp[up]]);
      next = true;
    } else if(next){
      next = false;
      continue;
    } else {
      result += Number(system[temp[i]]);
    }
  }
  console.log('result: ', result);
  return result;
}


// ----- Answer -----
const chai = require('chai');

chai.expect(solution('XXI') == 21, 'XXI should == 21');
chai.expect(solution('I') == 1, 'I should == 1');
chai.expect(solution('IV') == 4, 'IV should == 4');
chai.expect(solution('MMVIII') == 2008, 'MMVIII should == 2008');
chai.expect(solution('MDCLXVI') == 1666, 'MDCLXVI should == 1666');