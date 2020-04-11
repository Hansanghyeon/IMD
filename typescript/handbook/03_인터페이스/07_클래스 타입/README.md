# 클래스 타입

## 인터페이스 구현

C# 및 Java와 같은 언어로 인터페이스를 사용하는 가장 일반적인 방법 중 하나로 클래스가 특정 계약을 충족하도록 명시적인 강제가 TypeScript에서도 가능하다는 것입니다.

```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

또한 아래의 예제에서 `setTime`과 마찬가지로 클래스에 구현된 인터페이스의 메서드를 만들 수도 있습니다.

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

인터페이스는 public 측면과 private 측면이 아닌 public 측면의 class를 만듭니다.<br />
클래스를 사용하여 클래스 인스턴스의 private 측에 특정 타입이 있는지 검사하는 것은 금지되어 있습니다.

## 클래스의 스태틱과 인스턴스의 차이점

클래스와 인터페이스로 작업할 때 클래스에 두 가지 타입이 있음을 명심하세요. 스태틱 측명의 타입과 인스턴스 특면의 타입 construct signature 으로 인터페이스를 만들고 이 인터페이스를 구현하는 클래스를 생성하려고 하면 오류가 발생할 수 있습니다.

```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

왜냐하면 클래스가 인터페이스를 구현할 때 클래스의 인스턴스 측면만 검사되기 떄문입니다.<br />
생성자는 정적인 측면이기 때문에 이 검사에 포함되지 않습니다.

대신 클래스의 정적인 측면에서 직접 작업해야 합니다.<br />
이 에에제에서 생성자를 위한 `ClockConstructor`와 인스턴스 메서드를 위한 `ClockInterface`라는 두 개의 인터페이스를 정의합니다.<br />
편의상 전달된 타입의 인스턴스를 생성하는 `createClock` 생성자 함수를 정의합니다.

```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number,
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log*("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

`createClock`의 첫 번째 매개 변수는 `createClock(AnalogClock, 7, 32)`에 `ClockConstructor` 타입이므로 `AnalogClock`이 올바른 생성자 시그니처(constructor singature)`을 가지고 있는지 확인합니다.