# 선택적 매개변수와 기본 매개변수

TypeScript에서는 모든 매개변수가 함수에 필요하다고 가정합니다.<br />
`null`또는 `undefined`가 주어질 수 없다는 것을 의미하는 것이 아니라 함수가 호출될 때 컴파일러가 각 매개변수에 값을 제공했는지 확인한다는 것입니다.<br />
또한 컴파일러는 이러한 매개변수들이 함수로 전달되는 유일한 매개변수라고 가정합니다.<br />
간단히 말해서 함수에 주어진 인수의 수는 그 함수에서 기대하는 매개변수의 수와 일치해야 합니다.

```ts
function buildName(firstName: string, lastnName: string) {
  return firstname + " " + lastName;
}

let result1 = buildName("Bob");                     // ❌, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");     // ❌, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");            // ✅
```

JavaScript에서 모든 매개변수는 선택 사항이며 매개변수를 원하는 대로 사용하지 않을 수 있습니다.<br />
그렇게 되면 그 매개변수들의 값은 `undefined`입니다. TypeScript에서 선택적인 매개변수를 사용하려면 선택적으로 사용하려는 매개변수의 끝에 `?`를 추가하세요.

예를 들어 위에서 사용한 lastName 매개변수를 선택적으로 사용할 수 있도록 합니다.

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

let result1 = buildName("Bob");                     // ✅
let result2 = buildName("Bob", "Adams", "Sr.");     // ❌, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");            // ✅
```

모든 선택적 매개변수는 필수 매개변수를 따라와야 합니다.<br />
last nanme 대신 first name을 선택적 매개변수로 만들고 싶다면 함수의 매개변수 순서를 변경해야 합니다.<br />
즉 목록의 first name을 마지막에 넣어야합니다.

TypeScript에서 사용자가 매개변수를 제공하지 않거나 사용자가 대신 `undefined`를 전달하더라도 매개변수가 할당되는 값을 설정할 수 있습니다.<br />
이것은 기본 매개변수라고 합니다.

앞의 예제를 따라 last name의 기본값을 `"Smith"`로 설정해보겠습니다.

```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                     // ✅
let result1 = buildName("Bob", undefined);          // ✅, 여전히 작동하며 "Bob Smith"를 반환합니다.
let result2 = buildName("Bob", "Adams", "Sr.");     // ❌, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");            // ✅
```

필수 매개변수의 뒤엥 오는 기본 매개변수는 선택적 매개변수로 취급되어 함수를 호출할 때 선택적 매개변수처럼 생략할 수 있습니다.<br />
이것은 선택적 매개변수와 후행 기본 매개변수가 해당 타입의 공통점을 공유한다는 것을 의미하므로

둘 다

```ts
function buildName(firstName: string, lastName?: string) {
  // ...
}
```

그리고

```ts
function buildName(firstName: string, lastName = "Smith") {
  // ...
}
```

`(firstName: string, lastName?: stirng) => string` 동일한 타입을 공유합니다.<br />
`lastName`의 기본 값은 타입에서 사라지고 매개변수가 선택사항이라는 사실만 남겨졌습니다.

일반 선택적 매개변수와 달리 기본 매개변수는 필수 매개변수 뒤에 나올 필요가 없습니다.<br />
기본 매개변수가 필수 매개변수 앞에 오는 경우 사용자는 명시적으로 `undefined`를 전달하여 기본 초기화된 값을 가져와야 합니다.

예를 들어 `firstName`에 기본 초기화만 있는 마지막 예제를 작성할 수 있습니다.


```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                     // ❌, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");     // ❌, 너무 많은 매개변수
let result2 = buildName("Bob", "Adams");            // ✅, "Bob Adams"를 반환합니다.
let result3 = buildName(undefined, "Adams");        // ✅, "Will Adams"를 반환합니다.
```