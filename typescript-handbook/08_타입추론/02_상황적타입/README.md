# 상황적 타입

타입 추론은 TypeScript의 "다른 방향"에서도 작동합니다.<br/>
이를 "상황적 타이핑(Coontextual Typeing)"이라고 합니다.<br/>
상황적 타입은 표현식의 타입의 위치에 의해 암시될 때 발생합니다.

```ts
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  // ❌
}
```

위의 코드에서 타입 오류를 제공하기 위해 TypeScript 타입 검사기를 `Window.onmousedown` 함수 타입을 사용하여 오른쪽 함수 표현식의 타입을 추론했습니다.<br/>
이렇게 했을 때 `mouseEvent` 매개 변수의 타입을 추론할 수 있었습니다.<br/>
이 함수 표현식이 문맥적으로 입력 된 위치에 있지 않으면 `mouseEvent` 매개변수는 `any` 타입을 가지며 오류는 발생하지 않습니다.

문맥적으로 타입이 정해진 표현식에 명시적인 타입 정보가 포함되어 있다면 해당 타입이 무시됩니다.

```ts
window.onmousedown = function(mouseEvent: any) {
  console.log(mouseEvent.button);  // 👍
}
```

매개 변수에 명시적 타입 주석이 있는 함수 표현식은 상황적 타입을 대체합니다.<br/>
일단 그렇게 되면 상황적 타입이 적용되지 않으므로 오류가 발생하지 않습니다.

상황적 타이핑은 많은 경우에 적용됩니다.<br/>
일반적인 경우에는 함수 호출에 대한 인수, 할당의 우측 표현식, 타입 단언(Type Assertions), 객체의 멤버와 배열 리터럴, 그리고 반환문입니다.<br/>
상황적 타입은 또한 가장 일반적인 타입의 후보 타입으로도 작용합니다.

```ts
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
```

이 예에서 가장 일반적인 타입은 `Animal`, `Rhino`, `Elephant`, `Snake` 네가지 집합으로 구성됩니다.<br/>
이 중에서 `Animal`은 가장 일반적인 타입 알고리즘으로 선택이 가능합니다.