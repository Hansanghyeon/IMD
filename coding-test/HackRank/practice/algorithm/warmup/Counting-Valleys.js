/**
 * 등산객이 등산할때 단계마다 기록을한다.
 * 위로 올라갈때 U 아래로 내려 갈때 D
 * ex
 * s = [UDDUDUU]
 * _/\      _
 *    \    /
 *     \/\/
 *
 * 지표면보다 낮은 계곡으로 들어간 횟수를 기록하여 return
 */

// Complete the countingValleys function below.
function countingValleys(n, s) {
  let valley = 0;
  let working = 0;
  let enter = false;
  for(let i = 0; i < n; i++) {
    s[i] === 'U' ? working++ : working--;

    if(working < 0 && enter === false) {
      enter = true;
      valley++;
    }
    if(working >= 0) {
      enter = false;
    }
  }
  console.log(valley);
  return valley;
}

countingValleys(8, ['U','D','D','D','U','D','U','U']);
