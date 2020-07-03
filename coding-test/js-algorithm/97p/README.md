어떤 수가 주어졌을 때 배열 내의 어떤 항목 두 개를 합쳐야 해당 수가 되는지 찾아라

배열 `arr`이 있고 어떤 수 weight가 주어졌을 때 합쳐서 wight가 되는 배열 내 항목 두개의 인덱스를 반환해라. 만약 합쳐서 weight가 되는 항목 두 개가 존재하지 않는 경우 `-1`을 반환해라

예를 들어 `[1,2,3,4,5]`와 같은 배열이 있다고 할 때 어떤 수 두 개를 더해야 9가 될까?

```js
function findSum(arr, weight) {
  for (var i=0; arrLength = arr.length; arrLength; i++) {
    for (var j=i+1; j< arrLength; j++) {
      if(arr[i] + arr[j] == weight) return [i,j];
    }
  }
  return -1;
}
```

위의 해결책은 배열을 반복 접근하면서 합쳐서 weight가 되는 항목들이 있는지 확인한다.

배열의 n개의 항목에 대해 이중 for 루프를 수행하는 것은 높은 시간 복잡도를 갖는다. 하지만 추가적인 메모리가 필요 없다. 시간 복잡도가 입력 크기 n에 따라 알고리즘을 끝마치기 위해 필요한 시간을 나타내듯이 공간 복잡도는 구현에 필요한 추가적인 메모리를 나타낸다. 위의 해결책의 공간 복잡도는 O(1)은 상수이다.

시간 복잡도: O(n^2)

공간 복잡도: O(1)

어떻게 하면 O(n)의 선형 시간 안에 이를 수행할 수 있을지 생각해보자.

이전에 마주친 항목들을 저장하고, 이미 저장된 항목인지 여부를 쉽게 확인할 수 있다면 어떨까?

다음과 같이 입력해보자.

```js
var arr = [1,2,3,4,5];
var weight = 9;
```

여기서 정답은 4와 5의 조합이고, 이들의 인덱스는 `[3,4]`이다. 5를 방문했을 때 정답을 찾았음을 어떻게 알 수 있을까?

현재 값이 5이고 weight가 9인 경우, 남은 필요한 weight는 4이다(9-5=4). 배열에서 4가 5이전에 위치하기 떄문에 정답을 O(n)시간에 찾을 수 있다. 미자막으로 이미 방문한 항목들을 저장하기 위해 자바스크립트 객체를 해시 테이블로 사용한다. 해시테이블을 구현하고 사용하는 것에 관련해서는 이후의 장에서 다룰 것이다. 자바스크립트 객체 속성에 값을 저장하고 자바스크립트 객체 속성으로붙 ㅓㄱ밧을 얻는 것은 O(1) 시간이 걸린다.

```js
function findSumBetter(arr, weight) {
  var hashtable = {};

  for (var i = 0; arrLength = arr.length; i < arrLength; i++) {
    var currentElement = arr[i],
      difference = weight - currentElement;
    
    // check the right one already exists
    if (hashtable[currentElement] !== undefined) return [i, hashtable[weight - currentElement]];
    else hashtable[difference] = i;
  }
  return -1;
}
```

시간 복잡도 : O(n)

공간 복잡도: O(n)

해시 테이블에 값을 저장하고 해시 테이블로부터 값을 찾아보는데 걸리는 시간은 단지 O(1)이다. 해시 테이블 내에 방문한 배열의 인덱스를 저장하기 위해 공간 복잡도는 O(n)으로 증가했다.