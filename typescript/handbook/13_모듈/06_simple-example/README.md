# 간단한 예제

아래에서는 각 모듈에서 이름이 지정된 단일 export만 내보내도록 이전 예쩨에 사용된 validato 구현을 통합했습니다.

컴파일하려면 커맨드 라인에 모듈 대상을 지정해야 합니다.<br/>
Node.js는 `--module commonjs`를 사용하세요<br/>
require.js의 경우 `--module amd`를 사용합니다.

```ts
tsc --module commonjs Test.ts
```

컴파일시 각 모듈은 별도의 `.js` 파일이 됩니다.<br/>
참조 태그와 마찬가지로 컴파일러는 의존된 파일들을 컴파일 하기 위해 `import` 문을 따릅니다.

**Validation.ts**

```ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
```

**LettersOnlyValidator.ts**

```ts
import { StringValidator } from './Validation';

const lettersRegexp = /^[A-Za-z]+$/;

export class LetterOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}
```

**ZipCodeValidator.ts**

```ts
import { StringValidator } from './Validation';

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

**Test.ts**

```ts
import { StringValidator } from './Validation'
import { ZipCodeValidator } from './ZipCodeValidator';
import { LettersOnlyValidator } from './LettersOnlyValidator';

// 시험용 샘플
let strings = ['Hello', '98052', '101'];

// 사용할 Validators
let validators: {[s: string]: StringValidator} = {};
validators["ZIP Code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// 각 문자열이 각 Validator를 통과했는지 여부를 보여줍니다.
strings.forEach(s => {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
  }
})
```
