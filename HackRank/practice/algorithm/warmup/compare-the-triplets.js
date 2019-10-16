// Complete the compareTriplets function below.
function compareTriplets(a, b) {
  let aResult = 0;
  let bResult = 0;
  if(a.length === b.length) {
    for(let i = 0; i < a.length; i++) {
      a[i] > b[i] ? aResult++ : bResult++;
      if(a[i] === b[i]) {
        bResult--;
      }
    }
    return [aResult, bResult];
  }else {
    console.error('a b no match')
  };
}