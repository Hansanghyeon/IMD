function duplicateEncode(word){
  word = word.toLowerCase();
  
  const middleResult = word.split('').reduce((acc, cur) => {
    if (acc[cur]) acc[cur]++;
    else acc[cur] = 1;
    return acc;
  }, {});
  let sortable = [];
  for (let i in middleResult) {
    sortable.push([i, middleResult[i]]);
  }
  sortable = sortable.filter(a => a[1] > 1);
  if (sortable.length === 0) return word.replace(/./g, '(');
  sortable.forEach(s => {
    if (s[0].match(new RegExp(/\\("|\\|\/|b|f|n|r|t|u[0-9]{4})/, 'g')) !== null) {
      word = word.replace(/\\("|\\|\/|b|f|n|r|t|u[0-9]{4})/g, ')');
    } else if (s[0].match(/(\)|\(|~|!)/g) !== null) {
      word = word.replace(/(\)|\(|~|!)/g, ')');
    } else {
      let reg = new RegExp(`${s[0]}`, 'g');
      word = word.replace(reg, ')');
    }
  });
  return word.replace(/[^\)]/g, '(');
}

// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

try {
  assertEquals(duplicateEncode("din"),"(((");
  assertEquals(duplicateEncode("recede"),"()()()");
  assertEquals(duplicateEncode("Success"),")())())","should ignore case");
  assertEquals(duplicateEncode("(( @"),"))((");

  console.log('Success');
} catch (error) {
  console.log(error);
}