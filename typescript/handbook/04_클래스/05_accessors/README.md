# 접근자

TypeScript는 객체의 멤버에 대한 접근을 인터셉트하는 방법으로 getters/setters를 지원합니다.<br />
이것을 통해 각 객체에서 멤버에 접근하는 방법을 세부적으로 제어할 수 있습니다.

간단한 클래스에 `get`과 `set`을 사용하도록 변환해 봅시다. 먼저 getter와 setter가 없는 예제부터 시작합시다.

```ts
class Employee {
  fullName: string;
}

let employee = new Employee();
employee.fullNmae = "Bob Smith";
if(employee.fullNmae) {
  console.log(employee.fullName);
}
```

사람들이 임의로 `fullName`을 직접 설정하는 것은 매우 편리하지만 기분 내키는 대로 이름을 바꿀 수 있다면 문제를 일으킬 수 있습니다.

이 버전에서는 employee를 수정할 수 있도록 하기 전에 사용자가 passcode를 사용할 수 있는지 확인합니다.<br />
이를 위해 passcode를 확인할 `fullName`에 대한 직접적인 권한을 `set`으로 교체합니다.<br />
앞의 예제가 계속해서 원활하게 작동하도록 하기 위해 그에 상응하는 `get`을 추가합니다.

```ts
let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if(passcode && passcode == 'secret passcode') {
      this._fullName = newName;
    }
    else {
      console.log("❗️: employee의 무단 업데이트!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if(employee.fullName) {
  console.log(employee.fullName);
}
```

접근자가 passcode를 확인하고 있다는 것을 입증하기 위해 passcode를 수정하고 passcode가 일치하지 않을 경우 employee에게 업데이트 권한이 없다는 경고 메시지를 받을 수 있습니다.

접근자에 대해 알아야 할 몇 가지 주의 사항

첫째, 접근자를 사용하려면 ECMAScript5 이상을 출력하도록 컴파일러를 설정해야 합니다. ECMAScript3 다운그레이드는 지원되지 않습니다.

둘때, `get`과 `set`을 가진 접근자는 자동적으로 `readonly`로 추론됩니다.<br />
이것은 코드에서 `.d.ts` 파일을 생성할 때 유용합니다. 왜냐하면 프로퍼티를 변경할 수 없다는 것을 알 수 있기 떄문입니다.
