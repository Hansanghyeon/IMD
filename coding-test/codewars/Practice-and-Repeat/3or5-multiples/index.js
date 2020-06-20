function solution(number){
  let result = 0;
  for(let i = 0; i < number; i++) {
    if (i%3 === 0 || i%5 === 0) {
      result += i;
    }
  }
  return result;
}


// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

function test(n, expected) {
  let actual = solution(n);
  assertEquals(actual, expected, `Expected ${expected}, got ${actual}`);
}
test(10, 23);