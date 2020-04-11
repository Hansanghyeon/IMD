# 함수

JavaScript와 마찬가지로 TypeScript 함수는 기명 함수 또는 익명 함수로 만들 수 있습니다.<br/>
이를 통해 API의 함수 목록을 작성하든 다른 함수에 전달할 일회성 함수이든 애플리케이션에 가장 적합한 접근 방법을 선택할 수 있습니다.

이 두가지 접근 방식이 JavaScript에서 어떻게 보이는지 빠르게 요약하면

```ts
// 기명 함수
function add(x, y) {
  return x + y;
}

// 익명 함수
let myAdd = function(x, y) { return x + y };
```

JavaScript에서와 마찬가지로 함수는 함수 본문 외부의 변수를 참조할 수 있습니다.<br/>
그렇게 할 때 이러한 변수들을 `capture`라고 말합니다.<br/>
이 기법의 사용 방법과 사용할 때의 절충 사항을 이해하는 것은 이 번 장의 범위를 벗어나지만 캡쳐의 메커니즘이 JavaScript와 TypeScript에 얼마나 중요한 부분인지 확실히 이해해야 합니다.

```ts
let z = 100;

function addToZ(x, y) {
  return x + y + z;
};
```
