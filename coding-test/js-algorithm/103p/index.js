function degLog(array) {
  for (let i = 0, arrayLength = array[0]; arrayLength.length > i; i++) {
    console.log(array[0][i]);
  }
  for (let i = 1, arrayLength = array.length; arrayLength > i; i++) {
    console.log(array[i][array[i].length - 1]);
  }
  array.shift();
  for (let i = 0, arraylength = array.length; arraylength > i; i++) {
    array[i].pop();
  }
  return array;
}

function degLog2(array) {
  let last = array.length - 1;
  for (let i = array[last].length; i > 0; i--) {
    console.log(array[last][i - 1]);
  }
  for (let i = array.length - 2; i >= 0; i--) {
    console.log(array[i][0]);
  }
  array.pop();
  for (let i = 0, arrayLength = array.length; arrayLength > i; i++) {
    array[i].shift();
  }
  return array;
}

let a = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

a = degLog(a);
a = degLog2(a);
a = degLog(a);
// a = degLog2(a);
// while (a !== undefined) {
//   a = degLog(a);
//   a = degLog2(a);
// }
