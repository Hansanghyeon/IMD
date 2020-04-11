# 인덱스 타입

인덱스 타입을 사용하면 동적 프로퍼티 이름을 사용하는 코드를 컴파일러가 검사하도록 할 수 있습니다. 예를 들어 일반적인 JavaScript 패턴은 객체에서 프로퍼티의 하위 집합을 선택하는 것입니다.

```ts
function pluck(o, names) {
  return names.map(n => o[n]);
}
```

다음은 **인덱스 타입 쿼리** 및 **인덱스 접근** 연산자를 사용하여 TypeScript에서 이 함수를 작성하고 사용하는 방법입니다.

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: 'Jarid',
  age: 35
}
let strings: string[] = pluck(person, ['name']);  // 👍, string[]
```

컴파일러는 `name`이 실제로 `Person`이 프로퍼티인지 확인합니다.<br/>
이 예제는 몇 가지 새로운 타입 연산자를 소개합니다. 첫 번째는 `keyof T`으로 **인덱스 타입 쿼리 연산자**입니다.<br/>
어떤 타입의 `T`에 대해서 `keyof T`는 `T`의 알려진 public 프로퍼티 이름들의 유니온입니다.

예를 들어

```ts
let personProps: keyof Person;  // 'name' | 'age'
```

`keyof Person`은 `'name' | 'age'`와 완전히 호환됩니다.<br/>
차이점은 `Person`에 또 다른 프로퍼티인 `address: string`을 추가하면 `keyof Person`은 자동으로 `'name' | 'age' | 'address'`로 업데이트된다는 점이다.<br/>
그리고 `pluck`과 같은 일반적인 컨텍스트에서 `keyof`를 사용할 수 있으며 이때 프로퍼티 이름을 미리 알 수는 없습니다.<br/>
즉 컴파일러가 올바른 프로퍼티 이름을 `pluck`으로 전달했는지 확인합니다.

```ts
pluck(person, ['age', 'unknown']);  // ❌, 'unknown'은 'name' | 'age'에 없습니다.
```

두 번째 연산자는 `T[K]`, **인덱스 접근 연산자(indexed access operator)**입니다.<br/>
여기서 타입의 구문은 표현식을 반영합니다.

즉 `person['name']`은 `Person['name']` 타입을 가집니다. - 예제에서는 단지 `string`입니다.

하지만 인덱스 타입 쿼리와 마찬가지로 `T[K]`를 사용하면 실질적으로 힘이 발휘되는 일반적인 컨텍스트에서 사용할 수 있습니다.<br/>
타입 변수 `K extends keyof T`를 확실히 만들어야 합니다.<br/>
여기 `getProperty`라는 함수가 있는 또 다른 예제가 있습니다.

```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];  // o[name]은 T[K] 타입입니다.
}
```

`getProperty`에서, `o: T`와 `name: K`는 `o[name]: T[K]`를 의미합니다.<br/>
일단 `T[K]` 결과를 반환하면 컴파일러는 실제 키의 타입을 인스턴스화하므로 `getProperty`의 반환 타입은 사용자가 요청하는 프로퍼티에 따라 달라집니다.

```ts
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown');  // ❌, 'unknown'은 'name' | 'age'에 없습니다.
```

## 인덱스 타입과 문자열 인덱스 시그니처

`keyof`와 `T[K]`는 문자열 인덱스 시그니처과 상호 작용합니다.<br/>
문자열 인덱스 시그니처를 가진 타입을 가지고 있다면 `keyof T`는 단지 `string`이 될 것입니다.<br/>
그리고 `T[string]`은 인덱스 시그니처의 한가지 종류일뿐입니다.

```ts
interface Map<T> {
  [key: string]: T;
}
let keys: keyof Map<number>;  // string
let value: Map<number>['foo'];  // number
```
