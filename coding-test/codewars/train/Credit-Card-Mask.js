/*
Examples
 maskify("4556364607935616") == "############5616"
 maskify(     "64607935616") ==      "#######5616"
 maskify(               "1") ==                "1"
 maskify(                "") ==                 ""

 // "What was the name of your first pet?"
 maskify("Skippy")                                   == "##ippy"
 maskify("Nananananananananananananananana Batman!") == "####################################man!"

 문제
 마지막 네 문제를 제외한 모든 문자를 #으로 바꾸는 것
*/

// return masked string
function maskify(cc) {
  let result = cc;
  for(let i = 0; i< cc.length; i++) {
    if(i < cc.length - 4) {
      result = result.replace(cc[i], '#');
    }
  }
  console.log(result);
  return result;
}
