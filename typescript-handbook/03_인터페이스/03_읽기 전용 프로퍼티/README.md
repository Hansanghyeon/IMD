# 읽기 전용 프로퍼티

일부 프로퍼티는 객체를 처음 생성할 때만 수정할 수 있어야 합니다.<br/>
프로퍼티 이름 앞에 `readonly` 을 붙여 넣어 지정할 수 있습니다.

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

객체 리터럴을 할당하여 `Point`를 구성할 수 있습니다. 할당 후 `x`와 `y`는 바꿀 수 없습니다.

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5;  // ❗️
```

TypeScript에는 모든 변형 메서드가 제거된 `Array<T>`와 동일한 `ReadonlyArray<T>` 타입이 있으므로 생성 후 배열을 변경하지 말하야 합니다.

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadolnyArray<number> = a;
ro[0] = 12;       // ❗️
ro.push(5);       // ❗️
ro.length = 100;  // ❗️
a = ro;           // ❗️
```

코드의 마지막 줄에서 전체 `ReadolnyArray`를 일반적인 배열로 다시 할당하는 것초자도 제한되는 것을 알 수 있습니다.<br/>
그럼에도 불구하고 타입 단언(assertion)을 통해 오버라이드 할 수 있습니다.

```ts
a = ro as number[];
```

## `readolny` vs. `const`

readolny을 사용할지 아니면 const 사용할지 기억할 수 있는 가장 쉬운 방법은 변수에서 사용할지 또는 프로퍼티에서 사용할지를 묻는 것입니다. 변수는 `const`를 사용하는 반면 프로퍼티는 `readolny`를 사용합니다.
