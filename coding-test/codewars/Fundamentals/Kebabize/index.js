function kebabize(str) {
  // 숫자 제거
  let instanceStr = str.replace(/[0-9]/g, '');
  instanceStr = instanceStr[0].toLowerCase() + instanceStr.substring(1);
  return instanceStr.replace(/([A-Z])/g, '-$1').toLowerCase();
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
  assertEquals(kebabize('myCamelCasedString'), 'my-camel-cased-string');
  assertEquals(kebabize('myCamelHas3Humps'), 'my-camel-has-humps');
} catch (error) {
  console.log(error);
}