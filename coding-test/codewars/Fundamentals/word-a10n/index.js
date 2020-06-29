function abbreviate(string) {
  const splitRegAfter = new RegExp('(-|,|!)', 'g');
  const splitRegBefore = new RegExp('(-)', 'g');
  const testReg = new RegExp('([a-zA-Z]){4,}', 'g');
  const stringArray = string.replace(splitRegAfter, ' $1 ').replace('  ', ' ').split(' ');
  for (const i in stringArray) {
    if (testReg.test(stringArray[i])) {
      console.log(stringArray[i], testReg.test(stringArray[i]));
      stringArray[i] = `${stringArray[i].substring(0,1)}${stringArray[i].length - 2}${stringArray[i].substring(stringArray[i].length - 1)}`
      console.log(stringArray[i])
    }
  }
  // 이렇게하면 실패함... 이유를 모르겠다. 
  // for (const i in stringArray) {
  //   if (testReg.test(stringArray[i])) {
  //     stringArray[i] = `${stringArray[i].substring(0,1)}${stringArray[i].length - 2}${stringArray[i].substring(stringArray[i].length - 1)}`
  //   }
  // }
  const result = stringArray.reduce((acc, cur) => {
    if (splitRegBefore.test(cur)) {
      return acc + cur;
    } else if (splitRegAfter.test(cur)) {
      return acc + cur;
    }
    return acc + ' '  + cur;
  }).replace(new RegExp('  ', 'g'),' ').replace(new RegExp('- ', 'g'), '-');
  return result;
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
  assertEquals(abbreviate("internationalization"), "i18n");
  assertEquals(abbreviate("accessibility"), "a11y");
  assertEquals(abbreviate("Accessibility"), "A11y");
  assertEquals(abbreviate("elephant-ride"), "e6t-r2e");
} catch (error) {
  console.log(error);
}