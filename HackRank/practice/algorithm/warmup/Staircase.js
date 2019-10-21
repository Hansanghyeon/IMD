/*
유명 문제!
피라미드 만들기

     #
    ##
   ###
  ####
 #####
######
 */

// Complete the staircase function below.
function staircase(n) {
  let result = '';
  let space = ' ';
  for(let i = 0; i < n; i++) {
    for(let b = 0; b < (n - i - 1); b++) {
      result += space;
    }
    for(let c = 0; c <= i; c++) {
      result += '#';
    }
    if(i < n - 1) result += '\n';
  }

  console.log(result);
  return result;
}

staircase(6);