# `export =` and `import = require()`

CommonJS와 AMD 모두 일반적으로 모듈의 모든 exports를 포함하는 `exports` 객체 개념을 가지고 있습니다.

또한 `exports` 객체를 커스텀 단일 객체로 대체하는 것을 지원합니다.<br/>
Default exports는 이 동작을 대신하는 역할을 합니다.<br/>
그러나 그 둘은 호환되지 않습니다.<br/>
TypeScript는 기존의 CommonJS와 AMD 워크플로우를 모델링하기 위해 `export =`를 지원합니다.

`export =`구문은 모듈에서 export된 단일 객체를 지정합니다. 클래스, 인터페이스, 네임스페이스, 함수 또는 열거형이 될 수 있습니다.

`export =`를 사용하여 모듈을 import 할 때 모듈을 import 하기 위해 TypeScript에 특정한 `import module = require('module')`을 사용해야 합니다.

**ZipCodeValidator.ts**

```ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
  isAceeptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export ZipCodeValidator;
```

**Test.ts**

```ts
import zip = require('./ZipCodeValidator');

// 시험용 샘플
let strings = ['Hello', '98052', '101'];

// 사용할 Validators
let validator = new zip();

// 각 문자열이 각 Validator를 통과했는지 여부를 보여줍니다.
strings.forEach(s => {
  console.log(`"${s}" - ${validator.isAcceptable(s) ? "matches" : "does not match"}`);
});
```
