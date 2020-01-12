# 첫 번째 인터페이스

인터페이스의 작동 방식을 확인하는 가장 쉬운 방법은 간단한 예를 들어 시작하는 것입니다.

```ts
function printLabel(labelledObj: { label: string}) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

타입-체커는 `printLabel`에 대한 호출을 확인합니다.<br/>
`PrintLabel` 함수에는 객체를전달하는 데 필요한 단일 매개변수가 있으며 이는 문자열 타입의 `label` 프로퍼티를 가집니다.<br/>
실제로 객체는 이보다 더 많은 프로퍼티를 가지고 있지만 컴파일러는 필요한 속성이 `최소한` 있고 필요한 타입과 일치하는지만 검사합니다.<br/>
TypeScript가 그렇게 관대하지 않은 경우도 있습니다. 이에 대해 좀 더 자세히 다룰 것입니다.

이번에도 인터페이스를 사용하여 문자열 타입인 `label` 프로퍼티를 가져야 한다는 요구 사항을 설명하는 동일한 예제를 다시 작성할 수 있습니다.

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

인터페이스 `LabelledValue` 은 이전 예제의 요구 사항을 설명하는 데 사용할 수 있는 이름입니다.<br/>
여전히 `lavel`이라는 문자열 타입의 단일 프로퍼티가 있습니다.<br/>
`printLabel`에 전달하는 객체가 다른 언처러엄 이 인터페이스를 구현한다고 명시적으로 말할 필요가 없었습니다.<br/>
여기서는 중요한 형태일 뿐입니다. 함수로 전달되는 개체가 나열된 요구 사항을 충족하는 경우 허용됩니다.

타입-체커에서는 이러한 프로퍼티가 순서대로 제공될 것을 요구하지 않으며 다만 인터페이스에 필요한 속성이 있고 필요한 타입만 필요하다는 점을 지적하는 것이 중요합니다.