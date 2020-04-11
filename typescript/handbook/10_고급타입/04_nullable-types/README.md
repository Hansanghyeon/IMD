# Nullable types

TypeScript는 `null`과 `undefined` 값을 가지는 두 가지 특별한 타입이 있습니다.<br/>
이것을 기본 타입 센션에서 간략하게 언급했습니다.<br/>
기본적으로 타입 체커는 `null`과 `undefined`를 모든 항목에 할당 가능한 것으로 간주합니다.<br/>
사실상 `null`과 `undefined`는 모든 타입의 유요한 값입니다.<br/>
즉 방지하려는 경우조차도 any 타입에 할당되지 않도록 할 수 없습니다.<br/>
`null`의 발명가 토니 호어는 이것을 "10억 달러의 실수"라고 부릅니다.

`--strictNullChecks`에서 다음과 같이 수정할 수 있습니다. 변수를 선언할 때 자동으로 `null`또는 `undefined`가 포함되지 않습니다. 유니온 타입을 사용하여 명시적으로 포함할 수 있습니다.

```ts
let s = "foo";
s = null;   // ❌, 'null'은 'string'에 할당할 수 없습니다.
let sn: string | null = 'bar';
sn = null;  // 👍

sn = undefined;  // ❌, 'undefined'는 'string | null'에 할당할 수 없습니다.
```

TypeScript는 JavaScript의 의미론과 일치하도록 `null`과 `undefined`를 다르게 다루고 있습니다.<br/>
`string | null`은 `string | undefined`및 `string | undefined | null`과 다른 타입입니다.

## 선택적 매개변수와 프로퍼티

`--strictNullChecks`와 선택적 매개 변수는 자동으로 `| undefined`를 추가합니다.

```ts
function f(x: number, y?: number) {
  return x + (y || 0);
}

f(1, 2);
f(1);
f(1, undefined);
f(1, null);  // ❌, 'null'은 'number | undefined'에 할당할 수 없습니다.
```

선택적 프로퍼티의 경우에도 동일합니다.

```ts
class C {
  a: number;
  b?: number;
}

let c = new C();
c.a = 12;
c.a = undefined;  // ❌, 'undefined'를 'number'에 할당 할 수 없습니다.
c.b = 13;
c.b = undefined;  // 👍
c.b = null;  // ❌, 'null'은 'number | undefined'에 할당할 수 없습니다.
```

## 타입 가드와 타입 단언

nullable 타입은 유니온으로 구현되기 떄문에 타입 가드를 사용하여 `null`을 제거해야 합니다. 다행히 JavaScript에서 작성하는 코드는 다음과 같습니다.

```ts
function f(sn: string | null): string {
  if (sn == null)
    return 'default';
  else
    return sn;
}
```

여기서 `null`을 제거하는 것은 확실히 좋지만 간단한 연산자도 사용할 수 있습니다.

```ts
function f(sn: string | null): string {
  return sn || "default";
}
```

컴파일러가 `null`또는 `undefined`를 제거할 수 없는 경우 타입 단언 연산자를 사용하여 수동으로 제거할 수 있습니다.<br/>
구문은 후위에 `!`입니다. `identifier!`는 `identifier`의 타입 `null`과 `undefined`를 제거합니다.

```ts
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '. the' + epithet;  // ❌, 'name'이 null일 수 있습니다.
  }
  name = name || "Bob";
  return postfix("greet");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.chartAt(0) + '. the' + epithet;  // 👍
  }
  name = name || "Bob";
  return postfix("greet");
}
```

이 예제에서 컴파일러가 충첩된 함수 내에서 null을 제거할 수 없기 떄문에 여기에 충첩된 함수를 사용합니다(즉시실행 함수 제외).<br/>
특히 외부 함수에서 호출한 경우 중첩된 함수에 대한 모든 호출을 추적할 수 없기 떄문입니다.<br/>
함수가 어디에서 호출되는지 알지 못하면 body가 실행될 때 `name`의 타입이 무엇인지 알 수 없습니다.