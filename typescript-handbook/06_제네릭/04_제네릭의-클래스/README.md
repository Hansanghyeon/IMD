# 제네릭 클래스

제네릭 클래스는 제네릭 인터페이스와 형태가 비슷합니다.<br/>
제네릭 클래스는 클래스 이름 다음에 꺾쇠 괄호(`<>`)로 묶인 제네릭 타입 매개변수들을 갖습니다.

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y };
```

이것은 `GenericNumber` 문자 그대로 `number` 타입만 사용하도록 제한하는 것이 없다는 것을 눈치 챘을 것입니다. 대신 `string` 이나 더 복잡한 객체를 사용할 수 있을 것입니다.

```ts
let stringNumberic = new GenericNumber<string>();
stringNumberic.zeroValue = '';
stringNumberic.add = function(x, y) { return x + y }

alert(stringNumberic.add(stringNumberic.zeroValue, 'test'));
```

인터페이스와 마찬가지로 타입 매개변수를 클래스 자체에 두면 클래스의 모든 속성이 동일한 타입으로 작동하도록 할 수 있습니다.

클래스 섹션에서 다루었던 것처럼 클래스에 정적인 측면과 인스턴스 측면의 두가지 측면이 있습니다<br/>
제네릭 클래스는 정적 측면 보다는 인스턴스 측면에서만 제네릭이므로 클래스를 사용할 때 정적 멤버(static member)는 클래스의 타입 매개변수를 사용할 수 없습니다.
