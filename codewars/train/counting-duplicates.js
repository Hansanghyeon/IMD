function duplicateCount(text) {
  let resultMap = {};
  let arr = text.toLowerCase();

  for(let i in arr) {
    if(!(arr[i] in resultMap)) resultMap[arr[i]] = [];
    resultMap[arr[i]].push(arr[i]);
  }
  for(let i in resultMap) {
    if(resultMap[i].length <= 1) delete resultMap[i];
  }
  return Object.keys(resultMap).length
}
duplicateCount('aoskdoaskKKKK');