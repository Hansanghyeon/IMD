# 인터페이스 확장 클래스

인터페이스 타입이 클래스 타입을 확장하면 해당 클래스 멤버들을 상속하지만 구현을 상속하지는 않습니다.<br />
이는 마치 인터페이스가 구현을 제공하지 않고 클래스의 모든 멤버를 선언한 것과 같습니다.<br />
인터페이스는 기본 클래스의 private 및 protected 멤버조차도 상속합니다.<br />
즉 private 또는 protected 멤버가 있는 클래스를 확장하는 인터페이스를 생성하면 해당 인터페이스 타입은 해당 클래스 또는 해당 클래스의 버스 클래스에서만 구현할 수 있습니다.

이는 상속 계층이 크지만 특정 프로퍼티를 가진 서브 클래스에서만 코드가 작동하도록 지정하려는 경우에 유용합니다.<br />
서브 클래스는 기본 클래스에서 상속받는 것 외에는 관련이 없습니다.

예를 들어

```ts
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// ❗️, 'image' 타입이 'state' 프로퍼티가 없습니다.
class Image implements SelectableControl {
  select() {}
}

class Location {}
```

위의 예제에서 `SelectableControl`에는 Private `state` 프로퍼티를 포함한 `Control`의 모든 멤버가 포함되어있습니다.<br />
`state`는 `private` 멤버이기 때문에 `Control`의 자식만 `SelectableControl`을 구현할 수 있습니다.<br />
왜냐하면 `Control`의 자식들만이 같은 선언에서 시작된 `state` private 멤버를 가지기 때문입니다.<br />
이것은 private 멤버들이 호환 가능해야 합니다.

`Control` 클래스 내에서 `SelectableControl`의 인스턴스를 통해 `state` private 메멉에 접근할 수 있습니다.<br />
실제로 `SelectabelControl`은 알려진 대로 `select` 메서드를 가진 `Control`과 같은 역할을 합니다.<br />
`Button`과 `TextBox` 클래스는 `SelectableControl`의 하위 타입입니다.<br />
(왜냐하면 둘다 `Control`을 상속받으며 `select` 메서드를 가지기 때문입니다).<br />
그러나 `Image` 클래스와 `Location` 클래스는 그렇지 않습니다.