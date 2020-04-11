# 제네릭

TypeScript는 구조적인 타입 시스템이기 때문에 타입 매개변수는 멤버 타입의 일부로 사용될 때 결과 타입에만 영향을 줍니다.

예를 들어

```ts
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // 👍, y는 x의 구조와 일치합니다.
```

위의 경우 `x`와 `y`의 구조가 인수 타입을 차별화된 방식으로 사용하지 않기 때문에 호환 가능합니다.<br/>
`Empty<T>`에 멤버를 추가하여 이 예제를 변경하면 어떻게 동작하는지 보여줍니다.

```ts
interface NotEmpty<T> {
  data: T
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // ❌, x와 y는 호환되지 않습니다.
```

이런 식으로 인수 타입이 명시된 제네릭 타입은 비-제네릭 타입처럼 동작합니다.

인수 타입 지정되지 않은 제네릭 타입의 경우 모든 지정되지 않은 인수 타입 대신에 `any`를 지정하여 호환성을 검사합니다.<br/>
그런 다음 결과로 나타나는 유형의 호환성을 일반적이지 않은 경우와 마찬가지로 검사합니다.<br/>
그 결과 생성된 타입은 비-제네릭 경우와 마찬가지로 호환성을 검사합니다.

```ts
let identity = function<T>(x: T): T {
  // ...
}
let reverse = function<U>(y: U): U {
  // ...
}

identity = reverse;  // 👍, 왜냐하면 (x: any) => any 일치 (y: any) => any