# 추상 클래스

추상 클래스는 다른 클래스가 파생될 수 있는 기본 클래스입니다.<br/>
추상 클래스는 직접적으로 인스턴스화 할 수 없습니다.<br/>
인터페이스와 달리 추상 클래스는 클래스의 멤버에 대한 구현 세부 정보를 포함할 수 있습니다.<br/>
`abstract` 키워드는 추상 클래스뿐만 아니라 추상 클래스 내의 추상 메서드를 정의하는 데 사용합됩니다.

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earth...");
  }
}
```

abstract 으로 표시된 추상 클래스 내의 메서드는 구현을 포함하지 않으므로 파생된 클래스에서 구현해야 합니다.<br/>
추상 메서드는 인터페이스 메서드와 유사한 구문을 사용합니다.<br/>
둘다 메서드 본문을 포함하지 않고 메서드를 정의합니다.<br/>
그러나 추상 메서드는 `abstract` 키워드를 포함해야 하며 선택적으로 접근 지정자를 포함할 수 있습니다.

```ts
abstract class Department {
  constructor(public name: string) {
  }

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void;  // 파생된 클래스에서 구현해야 합니다.
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing");  // 파생된 클래스의 생성자는 super()를 호출해야 합니다.
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department;  // 👍: abstract 타입에 대한 참조를 만듭니다.
department = new Department();  // ❗️: 추상 클래스의 인스턴르르 생성할 수 없습니다.
department = new AccountingDepartment();  // 👍: 추상적이지 않은 하위 클래스를 생성하고 할당합니다.
department.printName();
department.printMeeting();
department.generateReports();  // ❗️: abstract 타입으로 선언된 메서드가 존재하지 않습니다.
```