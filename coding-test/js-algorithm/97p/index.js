/**
 * 
 * @param {Array} arr 
 * @param {Number} weight
 */
function findSumArrayValue(arr, weight) {
  let result = [];
  for(let i of arr) {
    const Remainder = arr.reduce((acc, cur) => {
      if (cur !== i) {
        acc.push(cur);
      }
      return acc;
    }, []);
    for(let z of Remainder) {
      if (z + i === weight) result = [z, i];
    }
  }
  if (result.length === 0) return -1;
  return result;
}

console.log(findSumArrayValue([1,2,3,4,5], 9))