/**
 * array는 연속된 알파벳 배열이 주어진다.
 * 시작은 다를수있지만 연속된 배열이다.
 * 중간에 생략된 순서의 알파벳을 도출해내야한다.
 * 소문자와 대문자를 구별한다.
 * @param array
 * @returns {string}
 */

/*
대부분의 사람들은 문자를 문자로 보지않고 숫자로 변환한다음
비교를 하는 방식으로한다.
다음부터는 문자를 비교할때는 문자열을 숫자로 변환해서
비교하는 방법으로 해야겠다.
 */

function findMissingLetter(array) {
  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let count = 0;
  let result = '';

  if(/[A-Z]/.test(array[0])) {
    for(let i in alphabet) {
      alphabet[i] = alphabet[i].toUpperCase();
    }
  }

  let numIndex = alphabet.indexOf(array[0]);
  alphabet = alphabet.splice(numIndex, alphabet.length);
  while (count <= array.length) {
    if(array[count] !== alphabet[count]) {
      result = alphabet[count];
      break;
    }
    count++;
  }
  return result;
}


// ----- TEST -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

describe("KataTests", function(){
  it("exampleTests", function(){
    assertEquals(findMissingLetter(['a','b','c','d','f']), 'e');
    assertEquals(findMissingLetter(['O','Q','R','S']), 'P');
  });
});

