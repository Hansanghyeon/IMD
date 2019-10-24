/**
 * TODO: 20191024
 * 문자열의 길이에따라 배열의 순서를 조작하지 않고
 * 문자열의 길이가 제일긴 순서대로 2번째까지
 * 배열순서대로 가져온다.
 * 이렇게 다시 알고리즘 제작
 */


function longestConsec(strarr, k) {

  let result = '';
  if(strarr.length > k) {
    strarr.sort((a, b) => {
      return b.length - a.length;
    });

    console.log()

    for(let i = 0; i < k; i++) {

      if(strarr[i] !== undefined) {
        result += strarr[i];
      }
    }
  } else {
    for(let i in strarr) {
      result += strarr[i];
    }
  }
  console.log(result);
  return result;
};


const assert = require('assert');

function testing(actual, expected) {
  assertEquals(actual, expected)
}
describe("longestConsec",function() {
  it("Basic tests",function() {
    testing(longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], 2), "abigailtheta")
    testing(longestConsec(["ejjjjmmtthh", "zxxuueeg", "aanlljrrrxx", "dqqqaaabbb", "oocccffuucccjjjkkkjyyyeehh"], 1), "oocccffuucccjjjkkkjyyyeehh")
    testing(longestConsec([], 3), "")
    testing(longestConsec(["itvayloxrp","wkppqsztdkmvcuwvereiupccauycnjutlv","vweqilsfytihvrzlaodfixoyxvyuyvgpck"], 2), "wkppqsztdkmvcuwvereiupccauycnjutlvvweqilsfytihvrzlaodfixoyxvyuyvgpck")
    testing(longestConsec(["wlwsasphmxx","owiaxujylentrklctozmymu","wpgozvxxiu"], 2), "wlwsasphmxxowiaxujylentrklctozmymu")
    testing(longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], -2), "")
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 3), "ixoyx3452zzzzzzzzzzzz")
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 15), "")
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 0), "")
  })});