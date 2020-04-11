class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let stringNumberic = new GenericNumber<string>();
stringNumberic.zeroValue = 'initial';
stringNumberic.add = function(x, y) { return x + y }

console.log(stringNumberic.add(stringNumberic.zeroValue, 'test'));