# 제네릭 타입 변수

제네릭을 사용하기 시작할 때 `identity`와 같은 제네릭 함수를 만들면 컴파일러는 함수 내부에 제네릭으로 타입이 지정된 매개변수를 올바르게 사용하도록 합니다.<br />
즉 실제로 이러한 매개변수를 모든 타입이 될 수 있는 것처럼 취급합니다.

앞에서 본 `identity` 함수를 보겠습니다.

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

각 호출과 함께 콘솔에 인수 `arg`의 길이를 기록하고 싶다면 어떻게 해야할까요? 이렇게 할지도 모릅니다.

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // ❌, T는 .length 메소드를 가지고 있지 않습니다.
  return arg;
}
```

컴파일러는 `arg`의 `.length` 멤버를 사용하고 있다는 오류를 주지만 `arg` 모듈에는 이 멤버가 없다고 할 수는 없습니다.<br />
이전에 타입 변수가 모든 타입이 될 수 있다고 했습니다.<br />
따라서 누군가 `.length` 멤버가 없는 `number`를 전달할 수 있을 것입니다.

실제로 이 함수가 `T` 대신 `T` 배열을 처리한다고 가정해 봅시다.<br />
그러면 배열을 처리할 수 있기 때문에 `.length` 멤버가 사용 가능해야 합니다.<br />
다른 타입의 배열을 생성하는 함수로 이것을 설명하겠습니다.

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array는 .lengt 멤버가있습니다. 오류없음
  return arg;
}
```

`loggingIdentity`는 타입 매개 변수 `T`를 인수로 받고 `arg`는 `T` 배열이며 `T` 배열을 반환합니다.<br />
숫자 배열을 인수로 넘기면 `T`가 `number`에 바인딩 되기 때문에 숫자 배열을 반환할 것입니다.<br />
이렇게하면 모든 타입이 아닌 처리하고자 하는 타입의 일부를 제네릭 타입 변수 `T`를 사용하여 유연성을 높일 수 있습니다.

혹은 다음 예제와 같이 작성할 수 있습니다.

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array는 .length 멤버가 있습니다. 오류 없음
  return arg;
}
```

이미 다른 언어의 타입 스타일에 대해 잘 알고 있을 것입니다.<br />
다음장에서는 `Array<T>`와 같이 자신만의 제네릭 타입을 만드는 방법을 다룰 것입니다.