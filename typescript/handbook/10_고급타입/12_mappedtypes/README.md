# Mapped types

일반적인 작업은 기존 타입을 선택하고 각 프로퍼티를 선택적으로 만드는 것입니다.

```ts
interface PersonPartial {
  name?: string;
  age?: number;
}
```

또는 readonly를 원할 수도 있습니다.

```ts
interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}
```

이러한 일은 JavaScript에서 자주 발생하여 TypeScript는 이전 타입인 - **mapped types** 타입을 기반으로 새로운 타입을 만드는 방법을 제공합니다.<br/>
mapped type에서 새로운 타입은 이전 타입의 각 프로퍼티를 동일한 방식으로 변환합니다.<br/>
예를 들어 모든 프로퍼티 타입을 `readolny`또는 선택적으로 설정할 수 있습니다.<br/>
아래 몇 가지 예제가 있습니다.

```ts
type Readonly<T> = {
  readolny [P in keyof T]: T[P];
}
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

그리고 그것을 사용하려면

```ts
type PersonPartial = Partial<Person>;
type personPartial = Readonly<Person>;
```

가장 간단한 mapped type과 해당 부분을 살펴보겠습니다.

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

구문은 인덱스 시그니처를 위한 구문과 `for.. in` 내부가 유사하게 사용됩니다.<br/>
세 가지 파트로 나뉩니다.

1. 변수 타입 `K`는 각 프로퍼티에 차례대로 바인딩 됩니다.
2. 문자열 리터럴 유니온 `Keys`는 반복할 프로퍼티의 이름을 포함합니다.
3. 결과적으로 생성된 프로퍼티 타입.

이 간단한 에제에서 `Keys`는 하드 코딩된 프로퍼티 이름의 리스트이고 프로퍼티 타입은 항상 `boolean`이므로 mapped type은 작성된 것과 같습니다.

```ts
type Flags = {
  option1: boolean;
  option2: boolean;
}
```

그러나 실제 애플리케이션은 위의 `Readolny` 또는 `Partial` 처럼 보입니다.<br/>
기존 타입을 기반으로 하며 어떤 방식으로든 필드를 변환합니다.<br/>
즉 `keyof`와 인덱스 접근 타입이 들어있는 곳입니다.

```ts
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }
```

하지만 일반적인 버전을 사용하는 것이 더 유용합니다.

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```

이 예제에서 프로퍼티 목록은 `keyof T`이며 결과 타입은 `T[P]`의 변형입니다.<br/>
이것은 mapped types의 일반적인 사용을 위한 좋은 템플릿입니다.<br/>
왜냐하면 이러한 종류의 변환은 유사 동형이기 때문에 매핑은 `T`의 프로퍼티에만 적용되고 다른 프로퍼티에는 적용되지 않습니다.<br/>
컴파일러는 새로운 프로퍼티를 추가하기 전에 기존의 프로퍼티 지정자를 모두 복사할 수 있다는 것을 알고 있습니다.<br/>
예를 들어 `Person.name`이 읽기 전용인 경우 `Partial<Person>.name`은 읽기 전용 및 선택적입니다.<br/>
다음은 `T[P]`가 `Proxy<T>` 클래스에 래핑된 또 하나의 예제입니다.

```ts
type Proxy<T> = {
  get(): T
  set(value: T): volid;
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
  // ... proxies 감싸기 ...
}
let proxyProps = proxify(props);
```

`Readonly<T>`와 `Partial<T>`는 매우 유용하기 때문에 TypeScript의 표준 라이브러리에 `Pick`과 `Record`와 함께 포함되어 있습니다.

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
type Record<K extends string, T> = {
  [P in K]: T;
}
```

`Readolny`, `Partial`과 `Pick`은 동형인 반면 `Record`는 그렇지 않습니다.<br/>
`Record`가 동형이 아닌 한가지 단선는 프로퍼티를 복사하는 데 입력 타입을 사용하지 않는다는 점입니다.

```ts
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```

동형이 아닌 타입은 본질적으로 새로운 프로퍼티를 생성하기 때문에 어디에서나 프로퍼티 지정자를 복사할 수 없습니다.

## mapped types의 추론

이제는 타입의 프로퍼티를 래핑하는 방법을 알았으므로 다음으로 해야 할 일은 언래핑(푸는)것입니다.<br/>
다행히도 꽤 쉽습니다.

```ts
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get();
  }
  return result;
}

let originalProps = unproxify(proxyProps);
```

이 언래핑 추론은 동형 매핑 타입에서만 작동합니다.<br/>
매핑된 타입이 동형이 아닌 경우에는 언래핑 함수에 명시적 타입 매개 변수를 지정해야 합니다.