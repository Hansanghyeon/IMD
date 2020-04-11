# Public, prvate, 그리고 protected 지정자

## 기본적인 Public

예를 들어 프로그램을 통해 선언된 멤버들에 자유롭게 접근할 수 있었습니다.

다른 언어의 클래스에 익숙하다면 위의 예에제서 `public`을 사용하지 않아도 된다는 사실을 알았을 것입니다.<br />
예를 들어 C#의 경우 각 멤버를 `public`으로 표시하도록 명시해야합니다.

TypeScript에서는 기본적으로 각 멥버가 `public`입니다.

그럼에도 불구하고 `public` 멤버를 명시적으로 표시할 수 있습니다.<br />
이전 섹션의 `Animal` 클래스를 다음과 같이 작성할 수 있었습니다.

```ts
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMaters}m.`);
  }
}
```

## `private` 이해하기

멤버가 `private`으로 표시되면 그 멤버를 포함하는 클래스의 외부에서는 접근할 수 없습니다.

```ts
class Animal {
  private name: string;
  constructor(theName: string) {this.name = theName}
}

new Animal("Cat").name;  // ❗️, 'name'은 private이다.
```

TypeScript는 구조적인 타입의 시스템입니다.<br />
두 개의 다른 타입을 비교할 때 그것들이 어디서 왔는지에 관계없이 모든 멤버의 타입이 호환 가능하다면 그 타입 자체가 호환성(compatible)이 있다고 말합니다.

그러나 `private`및 `protected` 멤버가 있는 타입을 비교할 때 이러한 타입들은 다르게 처리합니다.

호환성(compatible)이 있는 것으로 판단되는 두 가지 타입 중 `private` 멤버가 있는 경우 다른 멤버는 동일한 선언에서 유래된 `private`멤버가 있어야 합니다.<br />
이것은 `protected` 멤버에서도 적용됩니다.

실제로 이러한 기능이 어떻게 작동하는지를 더 잘아보기 위한 예를 살펴보겠습니다.

```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName }
}

class Rhino extends Animal {
  constructor() { super('Rhino')}
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal('Goat');
let rhino = new Rhino();
let employee = new Employee('Bob');

animal = rhino;
animal = employee;  // ❗️, 'Animal'과 'Employee'는 호환되지 않습니다.
```

이 에제에서는 `Animal`과 `Rhino`가 있습니다. `Rhino`는 `Animal`의 하위 클래스입니다. 또한 구체적으로 `Animal`과 같아 보이는 `Employee`라는 새로운 클래를 가지고 있습니다. 이러한 클래스들의 인스턴스들을 만들고 서로를 할당하여 어떠한 일이 발생하는지 봅시다.

`Animal`과 `Rhino`는 `Animal`의 `private name: string`선언으로부터 `private`의 혀앹로 공유하기 떄문에 호환됩니다. 그러나 `Employee`의 경우는 그렇지 않습니다.

`Employee`를 `Animal`에 할당하려고 할 때 이 타입들은 호환되지 않는다는 오류가 발생합니다.<br />
`Employee`도 `name`이라는 `private` 멤버가 있지만 `Animal`에서 선언한 것이 아닙니다.

## `protected` 이해하기

`protected` 지정자는 `private` 지정자와 매우 유사하게 동작합니다.<br />
단 `protected` 멤버도 선언된 파생 클래스의 인스턴스에서 접근할 수 있습니다.

```ts
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;
  constrcutor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);  // ❗️
```

`Person`의 외부에서 `name`을 사용할 수는 없지만 `Employee`는 `Person`으로부터 파생되기 때문에 `Employee`의 인스턴스 메서드 내에서 여전히 사용할 수 있습니다.

생성자 또한 `protected`로 표시될 수도 있습니다.<br />
즉 클래스를 포함하는 클래스 외부에서 클래스를 인스턴스화할 수는 없지만 확장될 수는 있습니다.

```ts
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName }
}

// EMployee는 Person을 확장할 수 있습니다.
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John");  // ❗️, 'Person'의 생성자는 protected입니다.
```
