function sumTwoSmallestNumbers(numbers) {  
  // 부동소수점 제외
  const reg = new RegExp('/^[0-9]*/[0-9]*[1-9]+$/', 'g');
  numbers.map(i => {
    if (!reg.test(i)) return i;
  });
  numbers.sort((a, b) => a - b);
  return numbers[0] + numbers[1];
}



// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

try {
  assertEquals(sumTwoSmallestNumbers([5, 8, 12, 19, 22]), 13 , "Sum should be 13");
  console.log('Success');
  assertEquals(sumTwoSmallestNumbers([15, 28, 4, 2, 43]), 6 , "Sum should be 6");
  console.log('Success');
  assertEquals(sumTwoSmallestNumbers([3, 87, 45, 12, 7]), 10 , "Sum should be 10");
  console.log('Success');
  assertEquals(sumTwoSmallestNumbers([23, 71, 33, 82, 1]), 24 , "Sum should be 24");
  console.log('Success');
  assertEquals(sumTwoSmallestNumbers([52, 76, 14, 12, 4]), 16 , "Sum should be 16");
  console.log('Success');
} catch (error) {
  console.log(error);
}