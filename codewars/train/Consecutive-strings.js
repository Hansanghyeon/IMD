function longestConsec(strarr, k) {
  // 중복제거
  let resultSet = new Set;
  for(let i in strarr) {
    resultSet.add(strarr[i]);
  }
  console.log(resultSet);
  let starrValues = resultSet.keys();

  let resultMap = new Map;
  for(let i of starrValues) {
    if(resultMap.has(i.length)) resultMap.set(Number(i.length + 1), resultMap.get(i.length));
      resultMap.set(Number(i.length), i);
  }
  console.log(resultMap);

  // 문자열 갯수카운팅 제일 높을 것부터 순서대로 숫자보여주기
  let number = resultMap.keys();
  let sorted = [];
  for(let sort of number) {
    sorted.push(sort);
  }
  sorted.sort((a,b) => {
    return b - a;
  });

  // 가장 긴문자열무터 2개 합치기
  let result = '';
  let maxCount = resultMap.size;
  for(let i = 0; maxCount < k ? i < maxCount : i < k; i++) {
    result += resultMap.get(sorted[i]);
  }

  console.log(result);
  // 정답 제출
  return result;
}


// longestConsec(["zone","zone","zone","zone", "abigail", "theta", "form", "libe", "zas"], 2);
// longestConsec(["wlwsasphmxx","owiaxujylentrklctozmymu","wpgozvxxiu"], 2);
longestConsec(["itvayloxrp","wkppqsztdkmvcuwvereiupccauycnjutlv","vweqilsfytihvrzlaodfixoyxvyuyvgpck"], 2);
