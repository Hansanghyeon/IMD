
# 두 함수 비교

원시적인 타입과 객체 타입을 기죠하는 것은 비교적 간단하지만 호환성이 있는 것으로 간주되어야 하는 함수의 종류에 대한 질문은 좀 더 복잡합니다.

먼저 매개변수 목록에서만 다른 두 함수의 기본 예제를 살펴보겠습니다.

```ts
let x = (a: number) => 0;
let y = (b: number, s:string) => 0;

y = x;  // 👍
x = y;  // ❌
```

`x`가 `y`에 할당될 수 있는지 확인하기 위해 우선 매개 변수 목록을 살펴봅니다. `x`의 각 매개 변수는 호환 가능한 타입을 가진 `y`에서 상응하는 매개 변수를 가져야합니다.

매개 변수 이름은 고려되지 않으면 타입만 고려됩니다.<br/>
이 경우 `x`의 모든 매개 변수는 `y`에 상응하는 호환 매개 변수를 가지므로 할당이 허용됩니다.

`y`에는 `x`가 필요하지 않는 두 번째 매개 변수가 있어 할당이 허용되지 않으므로 오류입니다.

`y =x` 예시와 같은 '버려지는' 매개변수를 허용하는지 이유가 의심스러울 겁니다.<br/>
이 할당이 허용되는 이유는 JavaScript에서 추가적인 함수 매개 변수를 무시하는 것이 상당히 흔한 일이기 때문입니다.

예를 들어 `Array#forEach`는 콜백 함수에 세 개의 매개 변수를 제공합니다. 배열 요소와 해당 인덱스 및 포함된 배열 그럼에도 불구하고 첫 번째 매개 변수만 사용하는 콜백을 제공하는 것은 매우 유용합니다.

```ts
let items = [1, 2, 3];

// 이러한 추가 매개 변수를 강제로 사용하지 마세요
items.forEach((item, index, array) => console.log(item));

// 괜찮을 거에요!
items.forEach(item => console.log(item));
```

이제 타입 유형에 따라 다른 두 함수를 사용하여 반환 타입을 처리하는 방법을 살펴보겠습니다.

```ts
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y;  // 👍
y = x;  // ❌, x에 location 프로퍼티가 없기 때문에 오류
```

타입 시스템은 소스 함수의 반환 타입이 대상 타입의 반환 타입의 서브 타입이 되도록 강제합니다.

## 함수 매개변수의 Bivariance

함수 매개 변수의 타입을 비교할 때 원본 매개 변수가 대상 매개 변수에 할당 가능하거나 그 반대일 경우 할당이 성공합니다.

이 것은 호출한 측에서 더 특수화된 타입을 취하는 함수를 제공하게 될 수도 있지만 덜 특수화된 타입의 함수를 호출할 수 있기 때문에 바람직하지 않습니다.

실제로 이런 종류의 오류는 드물기 때문에 이를 통해 많은 일반적인 JavaScript 패턴을 사용하 수 있습니다.

```ts
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number}
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  // ...
}

// 부적절하지만 유익하고 일반적인
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// 안정성에서 바람직하지 않은 대안
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(Eventtype.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',', + e.y)));

// 그래도 허영되지 않습니다(명확한 오류) 완전히 호환되지 않는 유형에 대해 적용되는 타입 안정성(Type safety)
listenEvent(EventType.Mouse, (e: number) => console.log(e));
```

## 선택적 매개 변수와 나머지 매개 변수

호환성을 위한 함수를 비교할 때 선택적 매개 변수와 필수 매개 변수는 서로 바꿔서 사용할 수 있습니다.<br/>
원본 타입의 추가 선택적 매개 변수는 오류가 아니며 원본 타입의 해당 매개 변수가 없는 대상 타입의 선택적 매개 변수는 오류가 아닙니다.

함수에 나머지 매개 변수가 있으면 함수가 선택적 매개 변수의 무한적인 집합인 것처럼 처리됩니다.

이는 타입 시스템의 관점에서 보면 중요하지 않지만 런타임 관점에서 선택적 매개 변수의 개념은 일반적으로 잘 적용되지 않습니다.<br/>
왜냐하면 그 위치에서 `undefined`가 통과하는 것이 대부분의 함수가 같기 때문입니다.

동기를 부여하는 에제는 콜백을 수행하고 일부(개발자에게) 예측 가능하지만 (타입 시스템에) 알 수 없는 인수를 사용하여 호출하는 일반적인 패턴입니다.

```ts
function invokeLater(args: any[], callback: (...args: any[]) => void) {
  // ... 'arg'로 콜백을 호출합니다.
}

// 부적절한 - invokeLater 임의의 수의 인수를 제공 '할 수도 있습니다'
invokeLater([1, 2], (x, y) => console.log(x + ',' + y));

// 혼란스러움 (x와 y는 정말로 필요합니다) 발견 할 수 없습니다
invokeLater([1, 2], (x?, y?) => console.log(x + ',' + y));
```

## 오버로드 함수

함수에 오버로드가 있는 경우 원본 타입의 각 오버로드는 대상 타입의 호환가능한 시그니처과 일치해야합니다.<br/>
이렇게하면 원본 함수와 동일한 모든 상황에서 대상 함수를 호출 할 수 있습니다.
