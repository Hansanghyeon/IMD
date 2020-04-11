/*
음수가 아닌 정수(초)를 입력으로 받아서 사람이 읽을 수 있는 형식(HH:MM:SS)으로
시간을 반환하는 함수를 작성
- HH = 시간, 2자리로 채워짐, 범위: 00-99
- MM = 분, 2자리로 채워짐, 범위: 00-59
- SS = 초, 2자리로 채워짐, 범위: 00-59
 */

function humanReadable(seconds) {
  // 시간정의
  let hours = Math.floor(seconds / 3600);
  let minute = Math.floor((seconds - (hours * 3600)) / 60);
  let second = seconds - (hours * 3600) - (minute * 60);

  if(hours < 10) hours = '0'+hours;
  if(minute < 10) minute = '0'+minute;
  if(second < 10) second = '0'+second;

  return hours+':'+minute+':'+second;
}

console.log(
  humanReadable(0), '\n',
  humanReadable(5), '\n',
  humanReadable(60), '\n',
  humanReadable(86399), '\n',
  humanReadable(359999)
);