/*
** HH:MM:SS AM,PM 으로된 s인자를 받아서
* 12시간 표긱법이아닌 24시간 표기 법으로 바꿔서 전달해줘야한다.
 */
function timeConversion(s) {
  /*
   * Write your code here.
   */
  if(s.indexOf('PM') !== -1) {
    s = s.replace('PM', '');
    s = s.split(':');
    if(s[0] !== '12')
      s[0] = Number(s[0]) + 12;
    return `${s[0]}:${s[1]}:${s[2]}`;
  }else {
    s = s.replace('AM', '');
    s = s.split(':');
    if(s[0] === '12') {
      s[0] = '00';
    }
    return `${s[0]}:${s[1]}:${s[2]}`;
  }
}