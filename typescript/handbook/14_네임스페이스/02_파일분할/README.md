# 파일 분할

애플리케이션이 증가함에 따라 코드를 여러 파일로 나누어 유지 보수하기 쉽게 만들려하고 합니다.

## Multi-file namespace

여기서 `Validation` 네임스페이르르 많은 파일들로 나눌 것입니다.<br/>
파일은 별개이지만 각각 동일한 네임스페이스에 기여할 수 있으며 모든 파일이 한곳에 정의된 것처럼 사용할 수 있습니다.<br/>
파일 간 의존성이 있기 때문에 컴파일러에게 파일들 간의 관게를 알려주는 참조 태그를 추가합니다.<br/>
테스트 코드는 변경되지 않습니다.

**Validation.ts**

```ts
namepsace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}
```

**LettersOnlyValidator.ts**

```ts
/// <reference path="Validation.ts" />
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}
```

**ZipCodeValidator.ts**

```ts
/// <reference path="Validatorion.ts" />
namespace Validator {
  const numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
```

**Test.ts**

```ts
/// <reference path="Validator.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// 시험용 샘플
let strings = ["Hello", "98052", "101"];

// 사용할 Validators
let validators: {[s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validatros["Letters only"] = new Validation.LettersOnlyValidator();

// 각 문자열이 Validator를 통과했는지 여부를 보여 줍니다.
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matchs" : "does not match" } ${name}`);
  }
}
```

여러 파일이 포함되면 컴파일된 모든 코드를 로드해야 합니다.<br/>
이 작업에는 두 가지 방법이 있습니다.

먼저 `--outFile`을 사용하여 모든 입력 파일을 단일 JavaScript 출력 파일로 컴파일 할 수 있습니다.

```bash
tsc --outFile sample.js Test.ts
```

컴파이럴는 파일에 있는 참조 태그를 기반으로 출력 파일을 자동으로 정렬합니다.<br/>
각 파일을 개별적으로 지정할 수도 있습니다.

```bash
tsx --outFile sample.js Validation.ts LetterOnlyValidator.ts ZipCodeValidator.ts Test.ts
```

또는 파일별 컴파일(기본값)을 사용하여 각 입력 파일에 대한 JavaScript 파일을 하나씩 방출할 수 있습니다.<br/>
만약 여러 개의 JS 파일이 생성되면 웹 페이지에 있는 `<script>` 태그를 사용하여 방출된 각 파일을 적절한 순서로대로 로드애햐 합니다.

예를 들어

**MyTestpage.html(excerpt)**

```html
<scirpt src="Validation.js" type="text/javascript" />
<scirpt src="LettersOnlyValidator.js" type="text/javascript" />
<scirpt src="ZipCodeValidator.js" type="text/javascript" />
<scirpt src="Test.js" type="text/javascript" />
```
