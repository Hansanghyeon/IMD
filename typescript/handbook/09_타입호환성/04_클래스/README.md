# 클래스

클래스는 한가지 예외를 제외하고 객체의 리터럴 타입 및 인터페이스와 유사하게 작동합니다. 정적 타입과 인스턴스 타입을 모두 포함합니다.

한 클래스 타입의 두 객체를 비교할 때 인스턴스의 멤버만 비교됩니다.<br/>
정적 멤버 및 생성자 호환성에 영향을 미치지 않습니다.

```ts
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(numFeet: number) {}
}

let a: Animal;
let s: Size;

a = s;  // 👍
s = a;  // 👍
```

## 클래스의 Private와 protected 멤버

클래스의 Private와 및 protected 멤버는 호환성에 영향을 줍니다.<br/>
클래스의 인스턴스가 호환성을 검사할 때 대상 타입에 private 멤버가 포함되어 있으면 원본 타입에 동일한 클래스에서 비롯된 private 멤버가 포함되어 있어야 합니다.<br/>
마찬가지로 protected 멤버가 있는 인스턴스에도 동일하게 적용됩니다.<br/>
이를 통해 클래스는 수퍼 클래스와 할당을 지정하는 것이 가능하지만 다른 상속 계층 구조의 클래스에서는 동일한 형태를 가질 수 없습니다.