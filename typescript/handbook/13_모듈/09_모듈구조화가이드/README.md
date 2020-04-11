# 모듈 구조화를 위한 가이드

## 최상위 레벨에 가깝게 내보내기

모듈의 사용자들은 export 한 것들을 사용할 때 가능한 마찰이 적어야합니다.<br/>
너무 많은 중첩의 레벨을 추가하는 것은 다루기 힘들기 때문에 구조화 방법에 대해 신중히 생각하세요.

모듈에서 네임스페이스를 export 하는 것은 중첩 계층을 너무 많이 추가하는 예입니다.<br/>
네임스페이스가 필요할때도 있지만 모듈을 사용할 때는 추가적인 레벨의 간접 참조를 추가합니다.<br/>
이는 사용자에게 재빠르게 고통이 될 수 있으며 일반적으로 불필요합니다.

export 클래스의 정적 메서드에도 비슷한 문제가 있습니다 - 클래스를 자체적으로 중첩 계층을 추가합니다.<br/>
표현이나 의도가 명확하고 유용한 방식으로 증가하지 않는 한 간단한 헬퍼 함수를 내보내는 것을 고려하세요.

## 단일 `class` 또는 `function`만 export 하는 경우 `export default`를 사용하세요

"최상위 레벨에 가깝게 내보내기"가 모듈 사용자의 마찰을 줄이는 것처럼 default export를 도입하는 것도 마찬가지입니다.<br/>
모듈의 주요 목적이 하나의 특정 export를 저장하는 것이라면 이를 default expot로 export하는 것을 고려해야 합니다.<br/>
이렇게 하면 importing를 사용하며 실제로 import를 더 쉽게 사용할 수 있습니다.

### MyClass.ts

```ts
export default class SomeType {
  constructor() { ... }
}
```

### MyFunc.ts

```ts
export default function getThing() { return "thing" }
```

### Consumer.ts

```ts
import t from './MyClass';
import f from './MyFunc';

let x = new t();
console.log(f());
```

이는 사용자를 위한 최적의 선택입니다.<br/>
타입의 이름을 원하는 대로 지을 수 있으며(이 경우 `t`) 객체를 찾기 위해 과도하게 점을 찍을 필요가 없습니다.

## 다수의 객체를 내보내는 경우 모두 최상위 레벨에 배치하세요.

### MyThings.ts

```ts
export class SomeType { /* ... */ }
export function someFunc() { /* ... */ }
```

반대로 가져올 때

## imported 이름을 명시적으로 나열

### Consumer.ts

```ts
import { SomeType, someFunc } from './MyThing';
let x = new SomeType();
let y = someFunc();
```

## 다수를 importing 하는 경우 네임스페이스 import 패턴 사용

### MyLargeModule.ts

```ts
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }
```

### Consumer.ts

```ts
import * as myLargeModule from './MyLargeModule.ts';
let x = new myLargeModule.Dog();
```

## 확장을 위한 다시 내보내기

종종 모듈의 기능을 확장해야 합니다.<br/>
일반적인 JS 패턴은 JQuery 확장이 작동하는 것과 비슷한 extensions을 사용하여 원본 객체를 보강하는 것입니다.<br/>
앞서 언급했듯이 모듈은 전역 네임스페이스 객체처럼 병합되지 않습니다.<br/>
권장되는 해결책은 원본 객체를 변형시키지 않고 새로운 기능을 제공하는 새로운 엔티티를 export하는 것입니다.

`Calculator.ts` 모듈에 정의된 간단한 계산기를 구현을 고려해보세요.<br/>
또한 모듈은 입력 문자열 목록을 전달하고 끝에 결과를 작성하여 계산기 기능을 테스트하는 헬퍼 함수를 exports 합니다.

### Calculator.ts

```ts
export class Calculator {
  private current = 0;
  private memory = 0;
  private operator!: string;

  protected processDigit(digit: string, currentValue: number) {
    if (digit >= '0' && digit <= '9') {
      return currentValue * 10 + (digit.charCodeAt(0) - '0'.charCodeAt(0))
    }
  }

  protected processOperator(operator: string ) {
    if (['+', '-', '*', '/'].indexOf(operator)>= 0) {
      return operator;
    }
  }

  protected evaluateOperator(operator: string, left: number, right: number): any {
    switch(this.operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
    }
  }

  private evaluate() {
    if(this.operator) {
      this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
    }
    else {
      this.memory = this.current;
    }
    this.current = 0;
  }

  public handelChar(char: string) {
    if(char === '=') {
      this.evaluate();
      return;
    }
    else {
      let value = this.processDigit(char, this.current);
      if( value !== undefined) {
        this.current = value;
        return;
      }
      else {
        let value = this.processOperator(char);
        if(value !== undefined) {
          this.evaluate();
          this.operator = value;
          return;
        }
      }
    }
    throw new Error(`Unsupported input: '${char}'`);
  }

  public getResult() {
    return this.memory;
  }
}

export function test(c: Calculator, input: string) {
  for(let i = 0; i < input.length; i++) {
    c.handelChar(input[i]);
  }

  console.log(`result of '${input}' is '${c.getResult()}'`);
}
```

다음은 `test` 함수를 사용한 계산기의 간단한 테스트입니다.

### TestCalculator.ts

```ts
import { Calculator, test } from "./Calculator";


let c = new Calculator();
test(c, "1+2*33/11="); // 9
```

이제 이것을 확장하여 10이 아닌 다른 수의 입력에 대한 지원을 추가하기 위한 `ProgrammerCalculator.ts`를 작성해 봅시다.

### ProgramnmerCalculator.ts

```ts
import { Calculator } from "./Calculator";

class ProgrammerCalculator extends Calculator {
    static digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    constructor(public base: number) {
        super();
        if (base <= 0 || base > ProgrammerCalculator.digits.length) {
            throw new Error("base has to be within 0 to 16 inclusive.");
        }
    }

    protected processDigit(digit: string, currentValue: number) {
        if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
            return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
        }
    }
}

// 새롭게 확장된 계산기를 계산기로 export 합니다.
export { ProgrammerCalculator as Calculator };

// 또한 헬퍼 함수를 export 합니다.
export { test } from "./Calculator";
```

다음은 우리의 ProgrammerCalculator 클래스에 대한 테스트입니다.<br/>
새로운 모듈 `ProgrammerCalculator`는 원래 `Calculator` 모듈과 비슷한 API 형태를 export하지만 원본 모듈의 어떠한 객체도 보강하지 않습니다.

### TestProgrammerCalculator.ts

```ts
import { Calculator, test } from "./ProgrammerCalculator";

let c = new Calculator(2);
test(c, "001+010="); // 3
```

## 모듈에서 네임 스페이스를 사용하지 마세요

모듈 기반 조직으로 처음 이동할 때의 트렌드는 추가 네임 스페이스 계층에 exports를 래핑하는 것입니다.<br/>
모듈에는 자체적인 스코프가 있으며 exports 선언만 모듈 외부에서 볼 수 있습니다.<br/>
이를 염두에 두고 네임스페이스는 모듈을 사용할 때 매우 작은 값을 제공합니다.

조직 측면에서는 네임스페이스가 논리적으로 관련된 객체와 타입을 전역 스코프로 그룹화할 때 편리합니다.<br/>
예를 들어 C#에서는 System.Collections의 모든 걸렉션 타입을 찾습니다.

타입 계층적 네임스페이스로 구성하여 이러한 타입의 사용자에게 훌륭한 '발견' 경험을 제공합니다.<br/>
반면 모듈은 필수적으로 파일 시스템에 이미 존재합니다.<br/>
경로와 파일 이름으로 해결해야 하므로 사용할 수 있는 논리적 조직 체계가 있습니다.<br/>
목록 모듈이 포함된 /collections/generic/ 폴더를 사용할 수 있습니다.

전역 스코프에서 충돌된 이름을 지정하지 않으려면 네임스페이스가 중요합니다.<br/>
예를 들어 `my.Application.Customer.AddForm`과 `My.Application.Order.AddForm` 같은 이름이리지만 다른 네임스페이스를 가진 두가지 타입이 있을 수 있습니다.<br/>
그러나 이것은 모듈과 관련된 문제는 아닙니다.<br/>
모듈 내에서 동일한 이름을 가진 두 객체를 갖는 그럴듯한 이유는 없습니다.<br/>
사용자는 모듈을 참조하는 데 사용할 이름을 선택하게 되므로 우연한 이름 충돌은 불가능합니다.

## 위험 신호

다음은 모두 모듈 구조화를 위한 위험한 요소들입니다<br/>
이 중 하나라도 파일에 적용되는 경우 외부 모듈의 네임스페이스를 지정하려고 하지 않는지 다시 확인하세요.

- 오직 최상위 레벨 선언만 `export namepace Foo {...}` 인 파일 (`Foo`를 제거하고 모든 것을 '위로' 이동시키세요)
- 단일 `export class`또는 `export function`가 있는 파일(`export default` 사용을 고려하세요)
- 최상위 파일 위치에 동일한 `export namespace Foo {`를 가진 다수의 파일(이것들이 `Foo` 하나로 결합될 것이라고 생각하지 마세요!)