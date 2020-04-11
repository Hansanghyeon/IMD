# 고급 기법

## 생성자 함수

TypeScript에서 클래스를 선언하면 실제로 여러 선언이 동시에 생성됩니다. 첫 번째 클래스의 인스턴스 타입입니다.

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

여기서 `let greeter: Greeter`라고 할 때 `Greeter` 클래스의 인스턴스 타입으로 `Greeter`를 사용합니다.<br/>
이것은 다른 객체 지향 언어를 사용하는 개발자에게는 거의 두 번째 특성입니다.

또한 생성자 함수라고 부르는 또 다른 값을 생성하고 있습니다. 이것은 클래스의 인스턴스를 `new` 할 때 호출되는 함수입니다.

실제로 이 과정이 어떻게 진행되고 있는지 확인하기 위해 위의 예제에서 생성된 JavaScript를 살펴보겠습니다.

```ts
let Greeter = (function () {
  function Greeter(message) {
    this.greeting = message;
  }
  Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
  };
  return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

여기서 `let Greeter`는 생성자 함수를 할당 받게 될 것입니다.<br/>
`new`를 호출하고 이 함수를 실행하면 클래스의 인스턴스를 얻습니다.<br/>
생성자 함수에 클래스의 모든 스태틱 멤버 또한 포함됩니다.<br/>
각각의 클래스를 생각하는 또 다른 방법은 인스턴스 측면과 스태틱 측면이 있다는 것입니다.

이 차이를 보여 주기 위해 예제를 약간 수정해 보겠습니다.

```ts
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if(this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: type of Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

이 예제에서 `greeter1`은 이전과 비슷하게 작동합니다.<br/>
`Greeter` 클래스를 인스턴스화하고 이 객체를 사용합니다.<br/>
이것은 전에 본 적이 있는 것입니다.

그런 다음 그 클래스를 직접 사용합니다.<br/>
여기서 `greeterMaker`라는 새로운 변수를 만듭니다.<br/>
이 변수는 클래스 자체를 유지하거나 생성자 함수라고 하는 또 다른 방법으로 설명합니다.

여기서 `typeof Greeter`를 사용합니다.<br/>
즉 "인스턴스 타입이 아닌 " `Greeter` 클래스 자체의 타입을 제공합니다".<br/>
또는 더 정확하게 생성자 함수의 타입인 "`Greeter`라는 symbol 타입을 제공합니다".<br/>
이 타입에는 `Greeter` 클래스의 인스턴를 생성하는 생성자와 함께 Greeter의 모든 스태틱 멤버가 포함됩니다.<br/>
`greeterMaker`에 `new`를 사용하는 것을 보여주며 `Greeter`의 새로운 인스턴스를 생성하고 이전과 같이 호출합니다.

## 클래스를 인터페이스로 사용하기

앞서 언급한 것처럼 클래스 선언은 두 가지를 생성합니다. 클래스의 인스턴스를 나타내는 타입과 생성자 함수<br/>
클래스는 타입을 작성하기 때문에 인터페이스를 사용할 수 있는 동일한 위치에서 타입을 사용할 수 있습니다.

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```
