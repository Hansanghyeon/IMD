function validBraces(braces){
  //TODO
  let temp = braces;
  console.log('temp.indexOf("()")',temp.indexOf('()'));
  console.log("temp.indexOf('[]')", temp.indexOf('[]'));
  console.log("temp.indexOf('{}')", temp.indexOf('{}'));
  while(temp.indexOf('()') >= 0 || temp.indexOf('[]') >= 0 || temp.indexOf('{}') >= 0) {
    console.log('조건:', temp.indexOf('()') <= 0 && temp.indexOf('[]') <= 0 && temp.indexOf('{}') <= 0);
    temp = temp.replace('()', '').replace('[]', '').replace('{}', '');
  }
  console.log('temp:', temp);
  console.log(temp.length);
  return temp.length <= 0;
}

// ----- best answer
function best_validBraces(braces){
  let matches = { '(':')', '{':'}', '[':']' };
  let stack = [];
  let currentChar;

  for (let i=0; i<braces.length; i++) {
    currentChar = braces[i];

    if (matches[currentChar]) { // opening braces
      stack.push(currentChar);
    } else { // closing braces
      if (currentChar !== matches[stack.pop()]) {
        return false;
      }
    }
  }

  return stack.length === 0; // any unclosed braces left?
}

//------- test mocha
const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

assertEquals(validBraces( "()" ), true);
assertEquals(validBraces( "[(])" ), false);