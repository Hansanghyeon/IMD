# Import

import는 모듈에서 export 만큼 쉽습니다.<br/>
export 선언을 가져오려면 아래의 `import` 형식 중 하나를 사용하십시오.

## 모듈에서 단일 내보내기 가져오기

```ts
import { ZipCodeValidator } from './ZipCodeValidator';

let myValidator = new ZipCodeValidator();
```

imports 이름을 변경할 수도 있습니다.

```ts
import { ZipCodeValidator } from './ZipCodeValidator';
let myValidator = new ZCV();
```

## 전체 모듈을 단일 변수로 가져오고 이를 사용하여 모듈 내보내기에 접근하기

```ts
import * as validator from './ZipCodeValidator';
let myValidator = new validator.ZipCodeValidator();
```

## 부수 효과에 대한 모듈만 가져오기

권장되지는 않지만 일부 모듈은 다른 모듈에서 사용할 수 있는 글로벌 상태를 설정합니다.<br/>
이러한 모듈에는 어떠한 exports도 없거나 사용자가 해당 exports에 관심이 없을 수 있습니다.

이러한 모듈을 가져오려면 다음을 사용합니다.

```ts
import './my-module.js';
```