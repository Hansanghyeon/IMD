# 나머지 매개변수

필수 매개변수와 선택적 매개변수 그리고 기본 매개변수 모두 공통점이 하나 있습니다. 한 번에 하나의 매개변수에 대해 이야기합니다.<br />
때로는 여러 매개변수를 그룹으로 사용하거나 함수가 마지막으로 가져올 매개변수의 수를 모를 수 있습니다.<br />
JavaScript에서는 모든 함수 본문에서 볼 수 있는 `arguments`를 사용하여 인수를 직접 사용할 수 있습니다.

TypeScript에서는 다음과 같은 인수를 변수로 함께 모을 수 있습니다.

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
```

나머지 매개변수는 무한적인 수의 선택적 매개변수로 처리됩니다.<br />
Rest 매개변수에 인수를 전달할 때는 원하는 만큼 사용할 수 있으며 심지어 통과할 수 없습니다.<br />
컴파일러는 줄임표(...) 다음에 전달된 인수들을 배열을 작성하여 함수에서 사용할 수 있습니다.

줄임표(...)는 나머지 매개변수가 있는 함수의 타입에도 사용됩니다.

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let buildNameFun: (fname:string, ...rest: string[]) => string = buildName;
```