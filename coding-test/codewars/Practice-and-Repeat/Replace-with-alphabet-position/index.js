function alphabetPosition(text) {
  let result = [];
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  text.toLowerCase().split('').forEach(letter => {
    let regExp = /[a-zA-Z]/g;
    if (regExp.test(letter)) result.push(alphabet.indexOf(letter) + 1);
  });
  return result.join(' ');
}



// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

try {
  assertEquals(alphabetPosition("The sunset sets at twelve o' clock."), "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11");
  assertEquals(alphabetPosition("The narwhal bacons at midnight."), "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20");
  console.log('Success')
} catch (error) {
  console.log(error);
}