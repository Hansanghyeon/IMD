# 함수의 타입

## 함수 작성하기

앞에서 살펴본 간단한 예제에 타입을 추가해보겠습니다.

```ts
function add(x: nunmber, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

각 매개변수에 타입을 추가한 다음 함수 자체에 타입을 추가하여 반환 타입을 추가할 수 있습니다.<br/>
TypeScript는 리턴문을 보고 반환 타입을 파악할 수 있기 때문에 대부분 선택적으로 반환 타입을 생략할 수 있습니다.

## 함수 타입 작성하기

이제 함수를 작성했으므로 함수 타입의 각 부분을 살펴보면서 함수의 전체 타입을 작성해보곘습니다.

```ts
let myAdd(x: number, y: number) => number = function(x: number, y: number): number { return x + y; };
```

함수의 타입은 두개의 파트로 나뉩니다. 인수의 타입과 반환 타입.<br/>
전체 함수 타입을 작성할 때 두 파트가 모두 필요합니다.<br/>
매개변수 타입과 같이 매개변수 목록을 기록하여 각 매개변수에 이름과 타입을 지정합니다.<br/>
이 이름은 가독성을 돕기 위한 것입니다.

위의 코드를 다음과 같이 작성할 수 있습니다.

```ts
let myAdd: (baseValue: number, increment: number) => number = function(x: number, y: nunmber): number { return x + y };
```

매개변수 타입이 정렬되어 있는 함수의 타입에 매개변수를 제공하는 이름에 관계 없이 매개변수 타입이 유효한 타입으로 간주됩니다.

두번째 파트는 반환 타입입니다.<br/>
매개변수와 반환 타입 사이에 굵은 화살표(=>)를 사용하여 반환 타입을 명확하게 합니다.<br/>
앞서 언급한 것처럼 이것은 함수 타입의 필수적인 부분이므로 함수가 값을 반환하지 않는 경우에는 반환 값을 남겨 두지 않고 `void`를 사용합니다.

주의사항, 매개변수와 반환 타입만 함수 타입을 구성합니다.<br/>
캡처된 변수는 타입에 반영되지 않습니다.<br/>
실제로 캡처된 변수는 함수의 "숨겨진 상태"의 일부이며 해당 API를 구성하지 않습니다.

## 타입 추론

예를 들어 TypeScript 컴파일러는 한쪽에는 타입이 있지만 다른 한쪽에 타입이 없는 경우 그 타입을 이해할 수 없다는 것을 알게 됩니다.

```ts
// myAdd는 완벽하게 함수 타입을 가지고 있습니다.
let myAdd = function(x: number, y: number): number { return x + y };

// 매개변수 'x'와 'y'에는 number 타입이 있습니다.
let myAdd: (baseValue: number, increment: number) => number = function(x, y) { return x + y };
```

이것을 타입 추론의 한 종류인 "상황적 타이핑"이라고 합니다. 이를 통해 프로그램을 계속 유지하는 데 드는 노력을 줄일 수 있습니다.
