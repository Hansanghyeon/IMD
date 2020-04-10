## 데코레이터 구성

다음 예제처럼 여러 데코레이터를 선언에 적용 할 수 있습니다.

- 한 줄에
  
  ```ts
  @f @g x
  ```

- 여러 줄에

  ```ts
  @f
  @g
  x
  ```

여러 데코레이터가 단일 선언에 적용되는 경우 평가는 수학에서의 함수 구성과 유사합니다.<br/>
이 모델에서 함수 f와 g을 구성할 때, 결과적인 합성 (f * g)(x)은 f(g(x))와 동일합니다.

따라서 TypeScript의 단일 선언에서 여러 데코레이터를 평가할 때 다음 단계를 수행합니다.

1. 각 데코레이터에 대한 표현식은 위에서 아래로 평가됩니다.
2. 그런 다음 결과는 아래에서 위로 함수를 호출합니다.

데코레이터 팩토리를 사용하려면 다음 예제에서 이 평가 순서를 관찰할 수 있습니다.

```ts
function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {}
}
```

그러면 이 출력을 콘솔에 출력합니다.

```
f(): evaluated
g(): evaluated
g(): called
f(): called
```

### 데코레이터 평가

클래스 내의 다양한 선언에 데코레이터를 적용하는 방법에 잘 정의된 순서가 있습니다.

매개 변수 Decorator, 메서드, 접근제어자 또는 속성 Decorator가 각 정적 멤버에 적용됩니다. Method, Accessor, PropertiesDeocraotr 등에 의한 파라미터 Decorator는 각 정적 멤버에 대해 적용된다.

1. 메서드, 접근제어자 또는 프로퍼티 데코레이터에 이어지는 매개변수 데코레이터는 각 인스턴스 멤버에 적용됩니다.
2. 메서드, 접근제어자 또는 프로퍼티 데코레이터에 이어지는 매개변수 데코레이터는 각 정적 멤버에 적용됩니다.
3. 매개변수 데코레이터는 생성자에 적용됩니다.
4. 클래스 데코레이터는 클래스에 적용됩니다.

### 클래스 데코레이터

클래스 데코레이터는 클래스 선언 바로 직전에 선언됩니다.<br/>
클래스 데코레이터는 클래스 정의를 관찰, 수정 또는 바꾸는 데 사용할 수 있는 클래스 생성자에 적용됩니다.<br/>
클래스 데코레이터는 선언 파일이나 다른 ambient 컨텍스트(예: `선언` 클래스)에서 사용할 수 없습니다.<br/>
클래스 데코레이터에 대한 표현식은 런타임에 함수로 호출되며 데코레이팅 클래스의 생성자는 대상을 유일한 인수로 호출됩니다.<br/>
클래스 데코레이터가 값을 반환하는 경우, 클래스 선언을 제공된 생성자 함수로 대체합니다.

주의 사항: 새 생성자 함수를 반환하도록 선택해야하는 경우 원본 프로토타입을 유지하도록 관리해야합니다. 런타임에 데코레이터를 적용하는 로직은 이 작업을 수행하지 않습니다.

다음은 `Greeter` 클래스에 적용된 클래스 데코레이터(`@sealed`)의 예제입니다.

```ts
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

다음 함수 선언을 사용하여 `@sealed` 데코레이터를 정의할 수 있습니다.

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

`@sealed`가 실행되면 생성자와 프로토타입 모두를 봉인합니다.<br/>
다음은 생성자를 재정의하는 방법에 대한 예제입니다.

```ts
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world"));
```