function meeting(s) {

  let result = s.toUpperCase().split(';');
  for(let i in result) {
    result[i] = result[i].split(':');
    let first = result[i][0];
    let second = result[i][1];
    result[i][0] = second;
    result[i][1] = first;
  }
  
  result = result.sort((a, b) => {
    
    if (a[0] === b[0]) {
      const a_namefirstLetter = a[1];
      const b_namefirstLetter = b[1];
      if (a_namefirstLetter > b_namefirstLetter) return 1;
      if (a_namefirstLetter < b_namefirstLetter) return -1;
      return 0;
    }

    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });
  
  for(let i in result) {
    result[i] = `(${result[i].join(', ')})`;
  }
  return result.join('');
}


// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

function testing(s, exp) {
  console.log("Testing:\n", s)
  let ans = meeting(s)
  console.log("Actual:\n", ans)
  console.log("Expect:\n", exp)
  assertEquals(ans, exp)
}

try {
  testing("Alexis:Wahl;John:Bell;Victoria:Schwarz;Abba:Dorny;Grace:Meta;Ann:Arno;Madison:STAN;Alex:Cornwell;Lewis:Kern;Megan:Stan;Alex:Korn", 
      "(ARNO, ANN)(BELL, JOHN)(CORNWELL, ALEX)(DORNY, ABBA)(KERN, LEWIS)(KORN, ALEX)(META, GRACE)(SCHWARZ, VICTORIA)(STAN, MADISON)(STAN, MEGAN)(WAHL, ALEXIS)");
  testing("John:Gates;Michael:Wahl;Megan:Bell;Paul:Dorries;James:Dorny;Lewis:Steve;Alex:Meta;Elizabeth:Russel;Anna:Korn;Ann:Kern;Amber:Cornwell", 
      "(BELL, MEGAN)(CORNWELL, AMBER)(DORNY, JAMES)(DORRIES, PAUL)(GATES, JOHN)(KERN, ANN)(KORN, ANNA)(META, ALEX)(RUSSEL, ELIZABETH)(STEVE, LEWIS)(WAHL, MICHAEL)");
  testing("Alex:Arno;Alissa:Cornwell;Sarah:Bell;Andrew:Dorries;Ann:Kern;Haley:Arno;Paul:Dorny;Madison:Kern", 
      "(ARNO, ALEX)(ARNO, HALEY)(BELL, SARAH)(CORNWELL, ALISSA)(DORNY, PAUL)(DORRIES, ANDREW)(KERN, ANN)(KERN, MADISON)");
  console.log('Success')
} catch (error) {
  console.log(error);
}