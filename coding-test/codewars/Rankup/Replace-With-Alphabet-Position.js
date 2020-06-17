/*
인자로 텍스트를 주어지면 텍스트의 자릿수를 도출해낸다
ex
"a" = 1
"b" = 2

alphabetPosition("The sunset sets at twelve o' clock.");
"20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
 */

function alphabetPosition(text) {
  let regexp = /[a-zA-Z]/;
  let result = '';
  for(let item of text) {
    if(regexp.test(item)) {
      result += item.toLowerCase().charCodeAt(0) - 96;
      result += ' ';
    }
  }
  console.log(result);
  return result.substring(0, result.length - 1);
}
alphabetPosition("The sunset sets at twelve o' clock.");