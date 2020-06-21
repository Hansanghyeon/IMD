function humanReadable(seconds) {
  let HH = '00';
  let MM = '00';
  let SS = '00';
  if (seconds / 3600 > 0) {
    let Hour = Math.floor(seconds / 3600);
    if (Hour < 10) HH = '0' + Hour;
    else HH = Hour;
    seconds = seconds - (Hour * 3600);
  }

  if (seconds / 60 > 0) {
    let Minute = Math.floor(seconds / 60);
    if (Minute < 10) MM = '0' + Minute;
    else MM = Minute;
    seconds = seconds - (Minute * 60);
  }

  if (seconds < 10) SS = '0' + seconds;
  else SS = seconds;

  return `${HH}:${MM}:${SS}`;
}

// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
assertEquals(humanReadable(5), '00:00:05', 'humanReadable(5)');
assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');