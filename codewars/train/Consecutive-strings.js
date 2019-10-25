/**
 * TODO: 20191024
 * 문자열의 길이에따라 배열의 순서를 조작하지 않고
 * 문자열의 길이가 제일긴 순서대로 2번째까지
 * 배열순서대로 가져온다.
 * 이렇게 다시 알고리즘 제작
 *
 * TODO: 20191025
 * 문자열의 길이가 동일한 배열의 요소들이 나열되어있을때
 * 입력받은 k만큼 뒤에서 k번째까지 리턴해줘야한다.
 */


function longestConsec(strarr, k) {
  let n = strarr.length;

  let result = "";
  if(!(n === 0 || k > n || k <= 0)) {
    console.log('===== start =====');
    // 중복제거
    let rSet = new Set;
    for(let item of strarr) {
      rSet.add(item);
    }

    let rMap = new Map;
    let oMap = new Map;
    for(let item of rSet) {
      rMap.set(item, item.length);
      oMap.set(item.length, item);
    }
    let entries = rMap.entries();
    let rSort = [];
    let order = [];
    for(let item of entries) {
      rSort.push(item);
      order.push(item);
    }
    order.sort((a, b) => {
      return b[1] - a[1];
    });

    console.log('\norder\n---\n', order);
    console.log('\nSort\n---\n',rSort);
    console.log('\nresource\n---');
    for(let i = 0; i < rSet.size; i++) {
      for(let z = 0; z < k; z++) {
        if(order[z][0] === rSort[i][0]) {
          result += oMap.get(rSort[i][1]);
          console.log(rSort[i][1])
        }
      }
    }
    console.log('\nresult\n---\n',result);
    console.log('\n===== end =====\n');
    return result;
  }else {
    return result;
  }
}

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

function testing(actual, expected) {
  assertEquals(actual, expected);
}
describe("longestConsec",function() {
  it("Basic tests",function() {
    testing(longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], 2), "abigailtheta");
    testing(longestConsec(["ejjjjmmtthh", "zxxuueeg", "aanlljrrrxx", "dqqqaaabbb", "oocccffuucccjjjkkkjyyyeehh"], 1), "oocccffuucccjjjkkkjyyyeehh");
    testing(longestConsec([], 3), "");
    testing(longestConsec(["itvayloxrp","wkppqsztdkmvcuwvereiupccauycnjutlv","vweqilsfytihvrzlaodfixoyxvyuyvgpck"], 2), "wkppqsztdkmvcuwvereiupccauycnjutlvvweqilsfytihvrzlaodfixoyxvyuyvgpck");
    testing(longestConsec(["wlwsasphmxx","owiaxujylentrklctozmymu","wpgozvxxiu"], 2), "wlwsasphmxxowiaxujylentrklctozmymu");
    testing(longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], -2), "");
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 3), "ixoyx3452zzzzzzzzzzzz");
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 15), "");
    testing(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 0), "");
  })});