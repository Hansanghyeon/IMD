function high(x){
  const splitString = x.split(' ');
  const scoring = splitString.map(e => {
    return [e.toLowerCase().match(/[a-z]/gi).map(c => c.charCodeAt() - 96).reduce((a,b) => a + b), e]
  })
  return scoring.sort((a,b) => b[0] - a[0])[0][1]
}

// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const _assertEquals = assert.strictEqual;

const assertEquals = (a, b) => {
  _assertEquals(a, b);
  console.log(a,'Success');
}

try {
  assertEquals(high('man i need a taxi up to ubud'), 'taxi');
  assertEquals(high('what time are we climbing up the volcano'), 'volcano'); 
  assertEquals(high('take me to semynak'), 'semynak');  
} catch (error) {
  console.log(error);
}