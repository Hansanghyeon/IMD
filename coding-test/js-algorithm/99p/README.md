`.slice()` 함수가 무엇을 수행하는지 복습해보자

`.slice()`는 배열의 시작 인덱스와 끝 인덱스 두 개의 매개변수를 받는다. `.slice()`는 배열의 수정 없이 기존 배열의 일부를 반환한다. 함수 arraySlice(array, beginIndex, endIndex)를 다음과 같이 구현해보자.

```js
function arraySlice(array, beginIndex, endIndex) {
  // 전달된 매개변수가 없으면 그냥 배열을 반환한다.
  if (!beginIndex && !endIndex) return array;

  // 시작 인덱스만 존재하는 경우 endIndex를 배열의 크기로 설정한다.
  endIndex = array.length;
  var partArray = [];

  // 시작 인덱스와 끝 인덱스 모두 지정된 경우 배열의 일부를 반환한다.
  for (var i = beginIndex; i < endIndex; i++) partArray.push(array[i]);

  return partArray;
}

arraySlice([1,2,3,4], 1, 2);  // [2]
arraySlice([1,2,3,4], 2, 4);  // [3, 4]
```

시간 복잡도: O(n)

공간 복잡도: O(n)

배열의 n개의 항목 모두에 접근해야 하기 때문에 시간 복잡도는 O(n)이다. 또한 배열을 복사할 때 n개의 항목을 보관해야 하기 떄문에 공간 복잡도도 O(n)이다.

