# 클래스

```ts
class Greeter {
  gretting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("world");
```

이전 C# 또는 Java를 사용한 적이 있는 경우 구문이 익숙하게 보여야 합니다.<br />
새로운 클래스인 `Greeter`을 선언합니다. 이 클래스에는 3개의 멤버가 있습니다. `greeting` 프로퍼티와 생서자 그리고 `greet` 메서드가 있습니다.

클래스의 멤버 중 하나를 참조할 때 클레스에서 `this`를 앞에 접두어로 붙입니다. 이것은 멤버에 접근하는 것을 뜻합니다.

마지막 줄에서는 `new`를 사용하여 `Greeter` 클래스의 인스턴스를 만듭니다.<br />
이것은 이전에 정의한 생성자를 호출하여 `Greeter` 형태의 새 객체를 만들고 생성자를 실행하여 이를 초기화합니다.