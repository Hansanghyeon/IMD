function arraySlice(arr, beginIndex, endIndex) {
  if (arr === undefined) throw 'arr parm is undefined!';
  if (beginIndex === undefined) return Array.from(arr);

  const result = [];
  for(let i = beginIndex, arrLength = endIndex || arr.length; i < arrLength; i++) {
    result.push(arr[i]);
  }
  return result;
}

console.log(arraySlice([1,2,3,4,5], 1,2))