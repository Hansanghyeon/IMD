# 유니온 식별

싱글톤, 유니온 타입, 타입 가드 및 타입 별칭을 결합하여 discriminated unions, tagged unions 또는 대수의 (algebraic) 데이터 타입라는 고급 패턴을 빌드할 수 있습니다.<br/>
Discriminated unions은 함수형 프로그래밍에 유용합니다.<br/>
일부 언어는 자동으로 discriminate unions 합니다. TypeScript는 현재 존재하는 JavaScript 패턴을 기반으로 합니다.<br/>
세가지 구성요소가 있습니다.

1. 공통적인 싱글톤 타입의 특성을 갖는 타입 - discriminant
2. 이러한 타입의 합집합을 취하는 타입 별칭 - union
3. 공통 프로퍼티에 타입 가드

```ts
interface Square {
  kind: "square";
  size: number;
}

interface Reactangle {
  kind: "reactangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: numbe;
}
```

먼저 결합할 인터페이스를 선언합니다.<br/>
각 인터페이스는 다른 문자열 리터럴 타입을 가진 `kind` 프로퍼티를 가지고 있습니다.<br/>
`kind` 프로퍼티는 discriminant또는 tag라고 부릅니다.<br/>
다른 프로퍼티는 각 인터페이스에 고유합니다.<br/>
인터페이스는 현재 관련이 없습니다.<br/>
그것들을 결합하여 넣습니다.

```ts
type Shape = Square | Reactangle | Circle;
```

이제 식별 유니온을 사용합니다.

```ts
function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "reactangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}
```

## 철저한 검사

식별 유니온의 모든 변형을 다루지 않을 때 컴파일러에서 알려주면 좋겠습니다.<br/>
예를 들어 `Shape`에 `Triangle`을 추가하면 `area`도 업데이트해야 합니다.

```ts
type Shape = Square | Reactangle | Circle | Triangle;
function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "reactangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
  // 여기서 오류가 발생해야 합니다 - "triangle"을 핸들링하지 않았습니다.
}
```

두 가지 방법이 있습니다. 첫 번째는 `--strictNullCheck`를 켜고 반환 타입을 지정하는 것입니다.

```ts
function area(s: Shape): number { // 오류: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```


`switch`가 더 이상 완전하지 않기 때문에 TypeScript는 그 함수가 때때로 `undefined`를 반환할 수 있다는 것을 알고 있습니다.<br/>
명시적 반환 타입 `number`를 가지고 있다면 반환 타입이 실제로 `number | undefined`라는 오류가 발생합니다.<br/>
그러나 이 방법은 매우 미묘하며 `--strictNullChecks`가 오래된 코드에서 항상 작동하는 것은 아닙니다.

두 번째 방법은 컴파일러가 철저히 검사하기 위해 `never` 타입을 사용한다는 점입니다.

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // 누락된 경우 여기에 오류가 발생합니다
    }
}
```

여기서, `assertNever`는 `s`가 `never` 타입인지 확인합니다. - 다른 모든 case가 종료된 후에 남겨진 타입이 제거되었습니다.<br/>
case를 잊어버리면 `s`가 실제 타입을 가지게되고 타입 에러가 생깁니다.<br/>
이 방법을 사용하려면 추가 함수를 정의해야 하지만 잊어버렸을 때 훨씬 더 분명해집니다.
