# 타입 가드와 차별된 타입

유니온 타입은 값을 취할 수 있는 타입으로 겹칠 수 있는 상황을 모델링 할 때 유용합니다.<br/>
`Fish`를 가지고 있는지에 대해 구체적으로 아랑야 할 필요가 있을 때 무슨 일이 일어날까요?<br/>
JavaScript에서 두 가지 가능한 값을 구별하는 일반적인 용어는 멤버의 존재를 확인하는 것입니다. 언급했듯이 유니온 타입의 모든 구성 요소에 포함될 수 있는 보장된 멤버에만 접근할 수 있습니다.

```ts
let pet = getSmallPet();

// 이러한 각 프로퍼티 접근은 오류를 발생시킵니다.
if (pet.swim)
  pet.swim();
else if (pet.fly)
  pet.fly();
```

동일한 코드가 작동하도록 하려면 타입 단언을 사용해야 합니다.

```ts
let pet = getSmallPet();

if ((<Fish>pet).swim)
  (<Fish>pet).swim();
else
  (<Bird>pet).fly();
```

## 사용자 정의 타입 가드

타입 단언(type assertions)을 여러 번 사용해야 했다는 것에 주목하세요.<br/>
일단 이 검사를 실시하면 각 지점에서 `pet`의 타입을 알 수 있습니다.

그런 일이 있을 때 TypeScript에는 type guard라는 것이 있습니다.<br/>
타입 가드(type guard)는 일부 스코프에서 타입을 보장하는 런타임 검사를 수행하는 표현식입니다.<br/>
타입 가드를 정의하려면 반환 타입이 타밍 명제(type predicate)인 함수를 정의하기만 하면 됩니다.

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
```

`pet is Fish`는 이 예제에서 타입 명제입니다.<br/>
명제는 `parameterName is Type` 형태를 취합니다. 여기서 `parameterName`은 현재 함수 시그니처의 매개 변수 이름이어야 합니다.

`IsFish`가 일부 변수와 함께 호출될 때 원래 타입이 호환 가능하다면 TypeScript는 그 변수를 특정 타입으로 제한할 것입니다.

```ts
// 'swim'과 `fly' 호출은 이제 모두 괜찮습니다.

if (isFish(pet))
  pet.swim();
else
  pet.fly();
```

TypeScript는 `pet`이 `if` 스코프의 `Fish`라는 것을 알고 있을 뿐만 아니라, `else` 스코프에서는 `Fish`가 없다는 것을 알기 때문에 `Bird`가 있어야 합니다.

## `typeof` 타입 가드

그럼 다시 돌아와 유니온 타입을 사용하는 `padLeft` 버전의 코드를 작성해보겠습니다.

```ts
function isNumber(x: any): x is number {
  return typeof x === 'number';
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding))
    return Array(padding + 1).join(' ') + value;
  if (isString(padding))
    return padding + value;
  throw new Error(`Expected string or number, got '${padding}.'`);
}
```

그러나 어떤 타입이 원시적인지 알아내는 함수를 정의하는 것은 고통스럽습니다.<br/>
다행스럽게도, typeScript가 자체적으로 타입 가드임을 인식하기 떄문에 `typeof x === 'number'`를 직접 함수로 추상화할 필요는 없습니다.<br/>
즉 이러한 인라인 검사를 작성할 수 있다는 것을 의미합니다.

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number')
    return Array(padding + 1).join(' ') + value;
  if (typeof padding === 'string')
    return padding + value;
  throw new Error(`Expected string or number, got '${padding}.'`);
}
```

이것들의 `typeof` 타입 가드는 두가지 다른 형태로 인식됩니다. `typeof v === 'typename'`와 `typeof v !== 'typname'`, 여기서 `typename`은 반드시 `number`, `string`, `boolean`또는 `symbol`.<br/>
TypeScript에서 다른 문자열과 비교하는 것을 멈추지는 않지만 언어에서 이러한 표현식을 타입 가드로 인식하지 않습니다.