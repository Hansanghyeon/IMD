// https://www.hackerrank.com/challenges/sock-merchant/problem?h_l=interview&playlist_slugs%5B%5D%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D%5B%5D=warmup&isFullScreen=true
// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
  let resultMap = {};
  let result = 0;

  for(let i in ar) {
    if(!(ar[i] in resultMap)) resultMap[ar[i]] = [];
    resultMap[ar[i]].push(ar[i]);
  }
  for(let i in resultMap) {
    if(resultMap[i].length <= 1) {
      delete resultMap[i];
    } else {
      result += Math.floor(
        (resultMap[i].length / 2)
      );
    }
  }
  return result;
}
sockMerchant(0, [10, 20, 20, 10, 10, 30, 50, 10, 20]);