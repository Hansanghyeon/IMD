function medianOfArray(array) {
  if (array.length < 3) throw '중앙값이 없습니다';
  // white section
  return array
    .sort()
    .slice(1, array.length - 1)
    .reduce((acc, cur) => acc + cur) / 2;
}
console.log(medianOfArray([5,2,3,4,1]))
