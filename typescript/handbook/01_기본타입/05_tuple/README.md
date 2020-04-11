# Tuple

튜플 타입은 고정된 개수의 요소 타입을 알고 있지만 반드시 같을 필요는 없는 배열을 표현할 수 있도록 합니다.
예를 들어, 다음과 같은 `string`과 `number`의 쌍으로 값을 나타낼 수 있습니다.

```ts
// 튜플 타입 선언
let x: [string, number];
// 초기화
x = ["hello", 10];  // 👍
// 부정확한 초기화
x = [10, "hello"];  // 👎
```

알려진 인덱스를 사용하여 요소에 접근하는 경우에 올바른 타입이 검색됩니다.

```ts
console.log(x[0].substr(1));  // 👍
console.log(x[1].substr(1));  // 👎, 'number'은 'substr'을 가지고 있지 않습니다.
```

알려진 인덱스 집합 외부의 요소에 접근할 때는 다음과 같이 Union 타입이 사용됩니다.

```ts
x[3] = "world";  // 👍, 'string'은 'string | number'에 할당될 수 있습니다.
console.log(x[5].toString());  //  👍, 'string' 및 'number'에 모두 'toString'이 있습니다.
x[6] = true;  //  👎, 'boolean'은 'string | number' 타입이 아닙니다.
```

유니온 타입은 다음 장에서 다루게 될 고급 주제입니다.