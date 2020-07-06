k개의 정렬된 배열에서 공통 항목 찾기

```js
var arr1 = [1, 5, 5, 10];
var arr2 = [3, 4, 5, 5, 10];
var arr3 = [5, 5, 10, 20];
var output = [5, 10];
```

위의 예제에서 배열의 개수가 세 개이기 때문에 k=3이다.

세 개의 배열에서 공통 항목을 찾기 위해 각 배열을 반복 접근하면서 매 항목의 개수를 세는 방법이 있다. 하지만 반복되는 항목은 두 번 확인할 필요가 없다(위의 예에서 배열 내에 5가 중복으로 당자하지만 항목 5에 대한 개수는 한 번만 증가돼야 한다). 이를 위해 개수를 증가시키기 전에 마지막 항목과 동일한지 확인해야 한다. 이는 배열이 정렬된 경우에만 동작할 것이다.

위의 세 개의 배열 모두를 반복 루프를 통해 접근한 뒤 해시 테이블의 속성을 반복 루프를 통해 접근해야 한다. 만약 해시 테이블의 어떤 항목의 값 3인 경우 해당 항목은 세 개의 배열 모두에서 등장한다는 것을 의미한다. 또 다른 for 루프에 해당 항목이 몇 번 등장했는지 확인해(24번째 줄) 세 개의 배열 모두에 등장한 공통 항목만을 포함하는 배열로 일반화할 수 있다.

```js
function commonElements(kArray) {
  var hashmap = {},
    last, answer = [];

  for (var i = 0, kArrayLength = kArray.length; i < kArrayLength; i++) {
    var currentArray = kArray[i];
      last = null;
    for (var j = 0, currentArrayLen = currentArray.length; j < currentArrayLen; j++) {
      var currentElement = currentArray[j];
      if (last != currentElement) {
        if (! hashmap[currentElement]) {
          hashmap[currentElement] = 1;
        } else {
          hashmap[currentELement]++;
        }
      }
      last = currentElement;
    }
  }

  for (var prop in hashmap) {
    if (hashmap[prop] == kArray.length) {
      answer.push(parseInt(prop));
    }
  }
  return answer;
}

commonElement([1,2,3], [1,2,3,4], [1,2]); // [1, 2]
```

시간 복잡도: O(kn)

공간 복잡도: O(n)

여기서 n은 가장 긴 배열의 길이이고 k는 배열의 개수다.