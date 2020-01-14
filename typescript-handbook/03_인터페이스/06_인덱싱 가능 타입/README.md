# 인덱싱 가능 타입

함수 타입을 설명하기 위해 인터페이스를 사용하는 방법과 마찬가지로 `a[10]` 또는 `ageMap["daniel"]` 처럼 "인덱스"를 생성할 수 있는 타입을 만들 수도 있습니다.<br />
인덱싱 가능 타입에는 객체로 인덱싱 하는 데 사용할 수 있는 타입과 인덱싱 할 때 해당 반환 타입을 설명하는 인덱스 시그니처가 있습니다.

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

위에서 우리는 인덱스 시그니처을 가진 `String Array` 인터페이스를 가지고 있습니다.<br />
이 인덱스 시그니처는 `StringArray`이 `number`로 인덱싱 될 때 `string`을 반환한다는 것을 나타냅니다.

지원되는 인덱스 시그니처에는 문자열과 숫자의 두 가지 타입이 있습니다.<br />
두가지 타입의 인덱서(indexer)를 모두 지원할 수 있지만 숫자(numeric) 인덱서에서 반환되는 타입은 문자열 인덱서에서 반환되는 타입의 하위 타입이어야 합니다.<br />
왜냐하면 `number`로 인덱싱을 생성하는 시점에 JavaScript가 객체로 인덱싱하기 전에 `string`으로 변환하기 떄문입니다.<br />
즉 `100` (`number`)로 인덱싱하는 것은 `100`(`string`)으로 인덱싱하는 것과 동일하므로 두 가지 모두 일관성이 있어야 합니다.

```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// ❗️: numeric과 string으로 인덱싱하면 완전히 다른 타입의 Animal을 얻를 수 있습니다!
interface NotOkey {
  [x: number]: Animal;
  [x: string]: Dog;
}
```

문자열 인덱스 시그니처가 "사전" 패턴을 만드는 강력한 방법이지만 모든 프로퍼티가 반환 타입과 일치하도록 강요합니다.<br />
문자열 인덱스의 `obj.property`가 `obj["property"]`으로도 사용할 수 있다고 선언하기 때문입니다.<br />
다음 예에서는 `name`의 타입이 문자열 인덱스의 타입과 일치하지 않으며 타입-체커에서 오류를 표시합니다.

```ts
interface NumberDictionary {
  [index: string]: number;
  length: number;   // 👍, length는 number입니다.
  name: string;     // ❗️, 'name'의 타입이 인덱서의 하위 타입이 아닙니다.
}
```

마지막으로 인덱스에 할당되지 않도록 시그니처를 읽기 전용으로 만들 수 있습니다.

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory";  // ❗️, Error!
```

인덱스 시그니처는 읽기 전용이므로 `myArray[2]`를 설정할 수 없습니다.
