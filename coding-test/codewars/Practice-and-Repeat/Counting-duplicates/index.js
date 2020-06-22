function duplicateCount(text){
  text = text.toLowerCase();

  const middleResult = text.split('').reduce((acc, cur) => {
    if (acc[cur]) acc[cur]++;
    else acc[cur] = 1;
    return acc;
  }, {});
  let sortable = [];
  for (let i in middleResult) {
    sortable.push([i, middleResult[i]]);
  }
  sortable = sortable.filter(a => a[1] > 1);

  return sortable.length;
}

// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

try {
  assertEquals(duplicateCount(""), 0);
  assertEquals(duplicateCount("abcde"), 0);
  assertEquals(duplicateCount("aabbcde"), 2);
  assertEquals(duplicateCount("aabBcde"), 2,"should ignore case");
  assertEquals(duplicateCount("Indivisibility"), 1);
  assertEquals(duplicateCount("Indivisibilities"), 2, "characters may not be adjacent");
  console.log('success');
} catch (error) { 
  console.log(error);
}
