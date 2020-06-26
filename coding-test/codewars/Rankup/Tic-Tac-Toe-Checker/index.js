function isSolved(board) {
  let result = null;

  // 무승부
  let draw = true;
  for(let i in board) {
    if (board[i].includes(0)) draw = false;
  }
  // 세로직선
  function row(line, target) {
    const row1 = board[line][0];
    const row2 = board[line][1];
    const row3 = board[line][2];
    return row1 === target && row1 === row2 && row1 === row3 ? target : false;
  }
  // 가로직선
  function col(line, target) {
    const col1 = board[0][line];
    const col2 = board[1][line];
    const col3 = board[2][line];
    return col1 === target && col1 === col2 && col1 === col3 ? target : false;
  }
  // 대각선
  function cross(direction,target) {
    const _1 = direction === 'left' ? board[0][0] : board[2][2];
    const _2 = direction === 'left' ? board[1][1] : board[1][1];
    const _3 = direction === 'left' ? board[2][2] : board[0][0];
    if (_1 === target && _1 === _2 && _1 === _3) return target;
    return _1 === target && _1 === _2 && _1 === _3 ? target : false;
  }
  result = 
    row(0, 1) || 
    row(0, 2) || 
    row(1, 1) || 
    row(1, 2) || 
    row(2, 1) || 
    row(2, 2) || 
    col(0, 1) || 
    col(0, 2) || 
    col(1, 1) || 
    col(1, 2) || 
    col(2, 1) || 
    col(2, 2) || 
    cross('left', 1) ||
    cross('left', 2) ||
    cross('right', 1) ||
    cross('right', 2)
    ;
  if (draw) return 0;
  console.log(draw, result, draw || result || -1);
  return draw || result || -1;
}



// ----- Answer -----

const chai = require('chai');
const assert = chai.assert;
const assertEquals = assert.strictEqual;

try {
  // You can use Test.expect(boolean, [optional] string) to test your code
  assertEquals(isSolved([[0,0,1],
    [0,1,2],
    [2,1,0]]), -1);
  assertEquals(isSolved([
    [2,1,2],
    [2,1,1],
    [1,2,1]]), 0);
  assertEquals(isSolved([
    [2,1,1],
    [0,1,1],
    [2,2,2]]), -1);
  assertEquals(isSolved([
    [1,2,1],
    [1,1,2],
    [2,1,2]]), 0);
  console.log('Success')
} catch (error) {
  console.log(error);
}