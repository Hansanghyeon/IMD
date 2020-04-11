# Default Exports

각 모듈은 선택적으로 `default` export를 내보낼 수 있습니다.<br/>
Default export는 `default` 키워드로 표시됩니다. 모듈별 `default` exports는 하나만 가능합니다.<br/>
`default` exports는 다름 import 형식을 사용하여 가져옵니다.

`default` exports는 정말 편리합니다.<br/>
예를 들어 `jQuery`같은 라이브러리에는 default export인 `jQuery`또는 `$`가 있을 수 있으며 이를 `$`나 `jQuery`라는 이름으로도 가져올 수 있습니다.

**jQuery.d.ts**

```ts
declare let $: jQuery;
export default $;
```

**App.ts**

```ts
import $ from 'jQuery';
$("button").html('Next stop...');
```

클래스 및 함수 선언은 default exports로 직접 작성될 수 있습니다.<br/>
Default export 클래스와 함수 선언 네이밍은 선택적입니다.

**ZipCodeValidator.ts**

```ts
export default class ZipCodeValidator {
  static numberRegexp = /^[0-9]+$/;
  isAcceptable(s: string) {
    return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
  }
}
```

**Test.ts**

```ts
import validator from './ZipCodeValidator';
let myValidator = new validator();
```

또는

**StaticZipCodeValidator.ts**

```ts
const numberRegexp = /^[0-9]+$/;
export default function (s: string) {
  return s.length === 5 && numberRegexp.test(s);
}
```

**Test.ts**

```ts
import validate from './StaticZipCodeValidator';

let strings = ['Hello', '98052', '101'];

// 함수 유효성 검사 사용
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? " matches" : "does not match"}`);
});
```

`default` exports 는 값일 수도 있습니다.

**OneTwoThree.ts**

```ts
export default "123";
```

**Log.ts**

```ts
import num from './OneTwoThree';

console.log(num);  // '123'
```
