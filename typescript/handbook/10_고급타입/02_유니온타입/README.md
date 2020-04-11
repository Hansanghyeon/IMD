# 유니온 타입

유니온 타입은 교차 타입과 밀접한 관련이 있지만 매우 다르게 사용됩니다.<br/>
때로는 매개 변수가 `number` 또는 `string`이 될 것으로 기대하는 라이브러리를 실행하게 됩니다.

예를 들어 다음과 같은 함수를 수행하십시오.

```ts
/**
 * string 타입을 가져와서 왼쪽에 "padding"을 추가합니다.
 * 'padding'이 string 인 경우 'padding'이 왼쪽에 추가됩니다.
 * 'padding'이 number 인 경우에는 해당 개수의 공백이 왼쪽에 추가됩니다.
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number')
    return Array(padding + 1).join(' ') + value;
  if (typeof padding === 'string')
    return padding + value;
  trhoe new Error(`Expected string or number, got '${padding}'.`);
}

padLeft('Hello world', 4);  // "    Hello world" 반환
```

`padLeft`의 문제점은 `padding` 매개 변수가 `any`로 분류된다는 것입니다.<br/>
즉 `number`이거나 `string`이 아닌 인수를 사용하여 호출할 수 있지만 TypeScript는 해당 인수와 함께 사용할 수 있습니다.

```ts
let indentedString = padLeft("Hello world", true);  // 컴파일 타입에는 통과되지만 런타임에는 실패합니다.
```

전통적인 객체 지향 코드에서는 타입의 계층을 만들어 두 가지 타입을 추상화 할 수 있습니다.<br/>
이것이 훨씬 더 명백하기는 하지만 또 약간 지나치기도 합니다.<br/>
`padLeft`의 원래 버전에 대한 좋은 점 중 하나는 원시 값을 전달할 수 있다는 것입니다.<br/>
이는 사용법이 간단하고 간결하다는 것을 의미했습니다.<br/>
이 새로운 접근법은 이미 다른 곳에 있는 함수를 사용하려는 경우에도 도움이 되지 않습니다.

`any`대신 `padding` 매개변수에 union type을 사용할 수 있습니다.

```ts
function padLeft(value: string, padding: string | number) {
  //...
}
let indentedString = padLeft("Hello world", true);  // 컴파일 시 오류
```

유니온 타입은 여러 타입 중 하나일 수 있는 값을 설명합니다.<br/>
각 타입을 구분하기 위해 수직 막대 (`|`)를 사용하므로 `number | string | boolean`은 `number`, `string` 또는 `boolean`이 될 수 있는 값의 타입입니다.

유니온 타입이 있는 값이 있으면 유니온의 모든 타입에 공통적인 멤버에만 접근할 수 있습니다.

```ts
interface Brid {
  fly();
  layEggs();
}
interface Fish {
  swim();
  leyEggs();
}

function getSmallPet(): Fish | Bird {
  // ..
}

let pet = getSmallPet();
pet.leyEggs();  // 👍
pet.swim();     // ❌
```

유니온 타입이 좀 까다로울 수도 있지만 익숙해지는 데는 약간의 직관이 필요할 뿐입니다.<br/>
어떠한 값에 `A | B` 타입이 있다면 `A`와 `B` 모두 가지고 있는 멤버가 있음을 확실히 알고 있습니다.<br/>
이 예제에서 `Brid`는 `fly`라는 멤버를 가지고 있습니다.<br/>
하지만 `Brid | Fish`의 변수 타입이 `fly` 메서드로 작용하고 있는지는 알 수 없습니다.<br/>
런타임 변수가 `Fish`인 경우 `pet.fly()` 호출은 실패합니다.