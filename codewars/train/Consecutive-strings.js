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
 *
 ** 20191026
 ** 이 문제를 포기하였습니다. 3일동안 문제를 푸는 것은
 ** 내식력이 모자란 것같습니다.
 ** 정답을가지고 해석하는 것이 좋을 것같다고 판단.
 */


function longestConsec(strarr, k) {
  let n = strarr.length;

  let result = "";
  if(!(n === 0 || k > n || k <= 0)) {
    // 중복제거
    let rSet = new Set;
    for(let item of strarr) {
      rSet.add(item);
    }

    let rMap = new Map;
    let oMap = new Map;
    for(let item of rSet) {
      rMap.set(item, item.length);
      if(oMap.has(item.length)) {
        let old = oMap.get(item.length);
        old.push(item);
        oMap.set(item.length, old);
      } else
        oMap.set(item.length, [item]);
    }
    let entries = rMap.entries();
    // 입력받은 문제의 배열을 가지고있고 글자의 카운팅도 가지고있는 배열
    let rSort = [];
    // 문자와 카운팅도가지고있지만 카운팅의 숫자의 순서대로 정리한 배열
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
    let count = k;

    let test = [...oMap.entries()].sort((a, b) => {
      return b[0] - a[0];
    });
    console.log(test);
    for(let i = 0; i < rSet.size; i++) {
      for(let z = 0; z < k; z++) {
        if(order[z][0] === rSort[i][0] && count >= 0) {
          console.log('oMap:', oMap);
          let isMap = oMap.get(rSort[i][1]).length;
          console.log(count);
          if(isMap > 1 && isMap >= count ) {
            continue;
          }
          result += rSort[i][0];
          count--;
        }
      }
    }
    console.log('\nresult\n---\n',result);
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