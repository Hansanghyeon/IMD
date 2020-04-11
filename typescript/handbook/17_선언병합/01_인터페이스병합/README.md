# 인터페이스 병합

가장 단순하고 아마도 가장 일반적인 타임의 선언 병합은 인터페이스 병합입니다.<br/>
가장 기본적인 수준에서 이 병합은 두 선언의 멤버를 기계적으로 같은 이름의 단일 인터페이스에 결합합니다.

```ts
interface Box {
  height: number;
  wdith: number;
}

interface Box {
  scale: number;
}

let box: Box = {
  height: 5,
  width: 6,
  scale: 10,
}
```

인터페이스의 비-함수 멤버는 고유해야 합니다.<br/>
고유하지 않다면 같은 타입이어야 합니다.<br/>
컴파일러는 인터페이스가 모두 같은 이름이지만 다른 타입의 비-함수 멤버를 선언하는 경우 오류를 발생시킵니다.

함수 멤버의 경우 같은 이름의 각 함수 멤버가 같은 함수의 오버로드를 설명하는 것으로 간주합니다.<br/>
또한 후위의 인터페이스 `A`와 인터페이스 `A`를 병합하는 경우에는 두 번째 인터페이스가 첫 번째 인터페이스보다 우선순위가 더 높다는 점이 주목됩니다.

예를 들어 다음과 같습니다.

```ts
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animai: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
```

세 개의 인터페이스가 병합되어 단일 선언을 생성합니다.

```ts
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

각 그룹의 요소는 같은 순서를 유지하지만 그룹 자체는 나중에 오버로드가 발생한 것이 가장 먼저 병합됩니다.

이 규칙에 대한 한가지 예외는 특수한 시그니처입니다.<br/>
시그니처의 타입이 단일 문자열 리터럴 타입(예: 문자 리터럴의 유니온이 아닌)인 매개 변수가 있는 경우 병합된 오버로드 목록의 맨 위로 버블링 됩니다.

예를 들어 다음 인터페이스가 함께 병합됩니다.

```ts
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: 'div'): HTMLDivElement;
  createElement(tagName: 'span'): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: 'canvas'): HTMLCanvasElement;
}
```

`Document`의 병합된 선언은 다음과 같습니다.

```ts
interface Document {
  createElement(tagName: 'canvas'): HTMLCanvasElement;
  createElement(tagName: 'div'): HTMLDivElement;
  createElement(tagName: 'span'): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
```