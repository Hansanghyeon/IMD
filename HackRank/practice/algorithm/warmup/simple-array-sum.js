function simpleArraySum(ar) {
  /*
   * Write your code here.
   */
  let result = 0;
  for(let i = 0; i < ar.length; i++) {
    result += ar[i];
  }
  return result;
}