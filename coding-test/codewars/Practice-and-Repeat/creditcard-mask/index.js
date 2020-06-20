// return masked string
function maskify(cc) {
  if(cc.length > 4) {
    let show = cc.substring(cc.length-4, cc.length);
    let secret = cc.substring(0, cc.length-4).replace(/./g, '#');
    return secret + show;
  }
  return cc;
}


// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

assertEquals(maskify('4556364607935616'), '############5616');
assertEquals(maskify('1'), '1');
assertEquals(maskify('11111'), '#1111');