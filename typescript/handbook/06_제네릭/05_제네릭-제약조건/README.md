# 제네릭 제약조건

이전의 예제를 기억한다면 타입들에 어떤 기능이 있는지에 대한 지식이 있는 타입에서 작동하는 제네릭 함수를 작성해야 할 때가 있습니다.<br/>
`loggingIdentity` 예제에서는 `arg`의 `.length` 프로퍼티에 접근하기를 원했지만 컴파일러는 모든 타입이 `.length` 속성을 가지고 있음을 증명할 수 없었습니다.<br/>
그래서 컴팡일러는 이러한 가정을 하지 않도록 경고를 줍니다.

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // ❌, T는 .length 메소드를 가지고 있지 않습니다.
  return arg;
}
```

모든 타입으로 작업하는 대신 이 함수가 `.length` 프로퍼티를 가진 모든 타입에서 작동하도록 제한을 두고 싶을 것입니다.<br/>
타입에 이 멤버가 있으면 타입을 허용하지만 적어도 이 멤버가 있어야 합니다.<br/>
그렇게 하기 위해서는 `T`가 무엇이 될 수 있는지에 대한 제약으로서 요구 사항을 작성해야 합니다.

그러기 위해 제약 조건을 설명하는 인터페이스를 만들 것입니다.<br/>
여기에서는 하나의 `.length` 프로퍼티를 가진 인터페이스를 만들고 이 인터페이스와 `extends` 키워드를 사용하여 제약조건을 나타냅니다.

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 이제 .length 프로퍼티가 있으므로 더이상 오류가 없습니다.
  return arg;
}
```

제네릭 함수는 이제 제한되어 있으므로 더이상 모든 타입에서 작동하지 않습니다.

```ts
loggingIdentity(3);  // ❌, number는 .length 프로퍼티가 없습니다.
```

대신 모든 필수 프로퍼티가 있는 타입의 값을 전달해야 합니다.

```ts
loggingIdentity({length: 10, value: 3});
```

## 제네릭 제약조건에서 타입 매개변수 사용

다른 타입 매개변수에 의해 제한되는 타입 매개변수를 선언할 수 있습니다.<br/>
예를 들어 여기서는 이름을 가진 객체의 프로퍼티를 가져오려 합니다.<br/>
실수로 `obj`에 존재하지 않는 프로퍼티를 잡아내지 않도록 하고자 합니다.<br/>
그래서 두가지 타입 사이에 제약조건을 적용할 것입니다.

```ts
function getProperty<T, k extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
```

## 제네릭에서 클래스 타입 사용

제네릭을 사용하여 TypeScript에서 팩토리를 생성할 때 생성자 함수를 사용하여 클래스 타입을 참조해야 합니다.

예를 들어

```ts
function create<T>(c: { new(): T; }): T {
  return new c()
}
```

아래의 고급 예제는 프로토타입 프로퍼티를 사용하여 생성자 함수와 클래스 타입의 인터페이스 사이의 관계를 추론하고 제한합니다.

```ts
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // 타입 체크
createInstance(Bee).keeper.hasMask;   // 타입 체크
```