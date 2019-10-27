function validBraces(braces){
  //TODO
  let temp = braces;
  console.log('temp.indexOf("()")',temp.indexOf('()'));
  console.log("temp.indexOf('[]')", temp.indexOf('[]'));
  console.log("temp.indexOf('{}')", temp.indexOf('{}'));
  while(temp.indexOf('()') >= 0 || temp.indexOf('[]') >= 0 || temp.indexOf('{}') >= 0) {
    console.log('조건:', temp.indexOf('()') <= 0 && temp.indexOf('[]') <= 0 && temp.indexOf('{}') <= 0);
    temp = temp.replace('()', '');
    temp = temp.replace('[]', '');
    temp = temp.replace('{}', '');
  }
  console.log('temp:', temp);
  console.log(temp.length);
  return temp.length <= 0;
}

//------- test mocha
const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

assertEquals(validBraces( "()" ), true);
assertEquals(validBraces( "[(])" ), false);