# 런타임시의 열거형

열거형은 런타임에 존재하는 실제 객체입니다.<br/>
예를 들어 다음 열거형을 보면,

```ts
enum E{
  X, Y, Z
}
```

실제로 함수에 전달 될 수 있습니다.

```ts
function f(obj: {X: number}) {
  return obj.X;
}

// 작동합니다. 왜냐하면 'E'는 숫자인 'X'라는 속성을 가지고있기 때문입니다.
f(E);
```

## 역 매핑

멤버에 대한 속성 이름이 있는 객체를 만드는 것 외에도 숫자 열거형 멤버는 열거형 값에서 열거형의 이름으로 역 매핑을 받습니다.

예를 들어, 다음 예제에서

```ts
enum Enum {
  A
}

let a = Enum.A;
let nameOfA = Enum[a];  // "A"
```

TypeScript는 이것을 다음 JavaScript로 컴파일합니다.

```ts
var Enum;
(function(Enum) {
  Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```

이 생성된 코드에서 열거형은 전방향(forward) (`name` -> `value`) 매핑과 역방향(reverse) (`value` -> `name`) 매핑을 모두 저장하는 객체로 컴파일됩니다.<br/>
다른 열거형 멤버에 대한 참조는 항상 속성 접근으로 방출되며 결코 인라인되지 않습니다.

문자열 열거형 멤버는 역매핑을 생성하지 않습니다.

## `const` 열거형

대부분의 경우 열거형은 완벽하게 유요한 방법입니다.<br/>
하지만 때때로 요구사항이 더 엄격합니다.<br/>
열거형의 값에 접근할 때 여부는 생성된 코드와 추가적인 우회 비용을 피하려면 `const` 열거형을 사용할 수 있습니다.<br/>
`const` 열거형은 열거형에 `const` 지시자를 사용하여 정의합니다.

```ts
const enum Enum {
  A = 1,
  B = A * 2,
}
```

`const` 열거형은 상수 열거형 표현식만 사용할 수 있으며 일반 열거형과 달리 컴파일하는 동안 완전히 제거됩니다.<br/>
`const` 열거형 멤버는 사용하는 사이트에서 인라인 됩니다.<br/>
`const` 열거형은 계산된 멤버를 가질 수 없기 때문에 가능합니다.

```ts
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

코드는 다음과 같이 컴파일 됩니다.

```ts
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```