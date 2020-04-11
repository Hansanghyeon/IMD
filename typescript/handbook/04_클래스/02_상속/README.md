# 상속

TypeScript에서는 일반적인 객체지향 패턴을 사용할 수 있습니다.<br />
클래스 기반 프로그래밍에서 가장 기본적인 패턴 중 하나는 상속을 사용하여 기존 클래스를 확장하여 새로운 클래스를 생성할 수 있다는 것입니다.

예제를 살펴보겠습니다.

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moves ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

이 예제는 가장 기본적인 상속 기능을 보여줍니다. 클래스는 기본 클래스에서 속성과 메서드를 상속받습니다.<br />
여기서 `Dog`는 `extends` 키워드를 사용하여 `Animal` 기본 클래스에서 유래된 파생 클래스입니다.<br />
파생 클래스는 종종 하위 클래스라고 하며 기본 클래스는 슈퍼 클래스라고도 합니다.

`Dog`는 `Animal`로부터 기능을 확장시키기 때문에 `bark()`와 `move()` 둘다 할 수 있는 `Dog`의 인스턴스를 만들 수 있습니다.

이제 좀 더 복잡한 예제를 살펴보겠습니다.

```ts
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; };
  move(distanceInMeter: number = 0) {
    console.log(`${this.name} moved ${distanceInMeter}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); };
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}
```

이 예제는 앞서 언급하지 않은 몇 가지 다른 기능을 다룹니다.<br />
이번에도 `Animal`의 새로운 하위 클래스인 `Horse`과 `Snake`을 만드는 `extends` 키워드가 등장합니다.

이전 예제와 한 가지 다른 점은 생성자 함수를 포함하는 각 파생 클래스가 기본 클래스의 생성자를 실행할 `super()`를 호출해야 한다는 것입니다.<br />
게다가 생성자 내에서 `this`에 있는 프로퍼티에 접근하기 전에 항상 `super()`를 호출해야 합니다.<br />
이것은 TypeScript가 적용할 중요한 규칙입니다.

또한 이 예제에서는 기본 클래스이 메서드를 하위 클래스에 특화된 메서드를 오버라이드 하는 방법도 보여줍니다.

여기에서 `Snake`와 `Horse`는 `Animal`의 `move`를 오버라이드하고 각 클래스에 고유한 기능을 부여하는 `move`메서드를 만듭니다.<br />
`tom`은 `Animal`로 선언되었지만 `Horse`의 값을 가지고 있으므로 `tom.move(34)`를 호출하면 `Horse`의 오버라이딩 메서드가 호출됩니다.