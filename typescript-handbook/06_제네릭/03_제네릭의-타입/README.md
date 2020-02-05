# 제네릭 타입

이전 장에서는 다양한 타입의 함수를 처리하는 제네릭 identity 함수를 만들었습니다.<br/>
이 장에서는 함수 자체의 타입과 제네릭 인터페이스를 만드는 방법에 대하여 살펴보겠습니다.

제네릭 함수의 타입은 함수 선언과 비슷하게 타입 매개변수가 먼저 나열된 비 제네릭 함수의 타입은 같습니다.

```ts
function identity<T>(arg: T): T{
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

타입 변수의 수와 타입 변수의 사용이 일치하다면 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있습니다.

```ts
function identity<T>(arg: T): T{
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

제네릭 타입을 객체 리터럴 타입의 호출 형식으로도 사용할 수 있습니다.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;
```

따라서 첫 번째 제네릭 인터페이스를 작성하게 됩니다.<br/>
앞의 예제에서 객체 리터럴을 가져와 인터페이스로 옮깁니다.

```ts
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

비슷한 예에서 제네릭 매개변수를 전체 인터페이스의 매개변수로 이동하려고 할 수 있습니다.<br/>
이렇게하면 일반적으로 사용하는 유영(예: `Dictionary`가 아닌 `Dictionary<string>`)을 볼 수 있습니다.<br/>
이것은 인터페이스의 다른 모든 멤버 타입 매개변수를 볼 수 있게합니다.

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T{
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

예제를 약간 다른 것으로 바꿔보겠습니다.<br/>
제네릭 함수 대신 제네릭 타입의 일부인 비 제네릭 함수 signature로 설명하겠습니다.<br/>
우리가 `GenericIdentityFn`을 사용할 때 대응하는 타입 매개변수(여기서는 `number`)를 지정할 필요가 있고 호출 형식을 효과적으로 고정시킬 것입니다.<br/>
언제 직접 호출 형식에 타입 파라미터를 삽입해야 하고 언제 인터페이스 자체에 삽입해야하는지를 이해하는 것이 타입의 어떤 측면이 제네릭인지 설명하는데 도움이 될 것입니다.

제네릭 인터페이스 외에도 제네릭 클래스를 만들 수 있습니다.<br/>
하지만 제네릭 열거형과 네임스페이스는 만들 수 없습니다.