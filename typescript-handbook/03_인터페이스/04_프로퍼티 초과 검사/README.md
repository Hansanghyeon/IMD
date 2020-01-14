# 프로퍼티 초과 검사

인터페이스를 사용하는 첫 번째 예에서 TypeScript를 사용하면 `{ size: number, label: string; }`을 `{ label: string; }`으로만 예상하는 항목으로 전달할 수 있습니다.<br />
또한 선택적 프로퍼티에 대해서 배웠고 그것이 소위 말하는 "옵션 백(option bags)"을 설명할 때 어떻게 유용한지도 배웠습니다.

그러나 두 가지를 결합하는 것은 JavaScript 에서 하고 있는 것과 같은 방식으로 자신의 무덤을 파는 것입니다.<br />
예를 들어 `createSquare`를 사용한 마지막 예제를 봅시다.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

`createSquare`의 인수는 `color`가 아닌 `colour` 입니다. 보통의 JavaScript에서 이러한 종류의 작업은 조용히 실패합니다.

`width` 프로퍼티가 호환되고 `color` 프로퍼티가 없으며 특별하게 `color` 프로퍼티가 대수롭지 않기 때문에 이 프로그램이 올바른 타입임을 주장할 수 있습니다.

그러나 TypeScript는 이 코드에 버그가 있을 수 있음을 나타냅니다.<br />
객체 리터럴은 다른 변수에 할당하거나 인수로 전달할 때 특별한 처리를 받아 프ㅜ로퍼티 초과 검사를 거칩니다. 객체 리터럴에 "대상 타입"에 없는 프로퍼티가 있을 경우 오류를 발생합니다.

```ts
// ❗️: 'colour'는 'SquareConfig` 타입에서 필요하지 않습니다.
let mySqaure = createSqaure({ colour: "red", width: 100 });
```

이런 검사를 하는 것은 실제로 정말 간단합니다.<br />
가장 쉬운 방법은 타입 단선(type assertion)을 사용하는 것입니다.

```ts
let mySqaure = createSqaure({ width: 100, opacity: 0.5 } as SqaureConfig);
```

하지만 객체에 특별한 방법으로 사용되는 추가 프로퍼티가 있는 것이 확실한 경우 문자열 인덱스 시그니처을 추가하는 것이 더 좋습니다.

`SqaureConfig` 가 위의 타입이 포함되는 `color` 및 `width` 프로퍼티가 가질 수 있지만 또 다른 속성도 있는 경우에는 다음과 같이 정의할 수 있습니다.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

이후에 인덱스 시그니처에 대해 이야기하겠지만 `SquareConfig`은 여러 프로퍼티들을 가질 수 있으며 `color` 또는 `width`가 아닌 다른 프로퍼티들의 타입은 문제 되지 않습니다.

이러한 검사를 하는 마지막 방법 중 하나는 객체를 다른 변수에 할당하는 것입니다. `squareOptions`은 너무 프로퍼티 초과 검사를 거치지 않기 때문에 컴파일러가 오류를 제공하지 않습니다.

```ts
let squareOptions = { colour: "red", width: 100 };
let mySqaure = createSquare(squareOptions);
```

위와 같은 간단한 코드의 경우에 이러한 검사를 "회피하는" 시도를 하지 말아야 합니다.<br />
메서드와 상태를 유지하는 더 복잡한 객체 리터럴의 경우 이러한 기법을 유지하고 싶은 마음이겠지만 대부분의 초과 프로퍼티 오류는 실제로 버그입니다.<br />
즉 옵션 백(option bags)과 같은 물건에 대해 초과 프로퍼티 검사 문제가 발생하는 경우 타입 선언 중 일부를 수정해야 할 수도 있습니다.<br />
`createSquare`에 `color`또는 `colour` 프로퍼티를 모두 포함한 객체를 전달하는 것이 괜찮은 경우 `squareConfig`의 정의를 수정해야 합니다.
