# 선택적 모듈 로딩과 기타 고급 로딩 시나리오

상황에 따라 일부 조건에서만 모듈을 로드할 수 있습니다.<br/>
TypeScript에서는 아래의 패턴을 통해 다른 고급 로드 시나리오를 구현하여 타입 안전성을 잃지 않고 모듈 로더를 직접 호출할 수 있습니다.<br/>
컴파일러나는 각 모듈이 방출된 JavaScript에서 사용되는지 여부를 감지합니다.<br/>
모듈 식별자가 타입 어노테이션의 일부로만 사용되고 표현식으로 사용되지 않으면 해당 모듈에 대한 `require` 호출이 방출하지 않습니다.<br/>
사용하지 않는 참조를 제거하면 성능이 최적화되고 해당 모듈을 선택적으로 로드할 수 있습니다.

이 패턴의 핵심 아이디어는 `import id = require('...')`문이 모듈에 의해 노출된 타입에 접근할 수 있다는 것입니다.<br/>
모듈 로더는 아래의 `if`블록처럼 동적으로 (`require`를 통해)호출됩니다.<br/>
이는 참조 생략 최적화가 활용되어 모듈이 필요한 경우에만 로드됩니다.<br/>
이 패턴이 작동하려면 `import`를 통해 정의된 symbol이 타입 위치에서만 사용되어야 합니다.(즉 JavaScript로 방출될 수 있는 위치에 절대 존재하지 않습니다).

타입 안전성을 유지하기 위해 `typeof` 키워드를 사용할 수 있습니다.<br/>
`typeof` 키워드는 타입의 위치에서 사용될 때 값의 타입을 생성하며 이 경우 모듈의 타입이 됩니다.

**Node.js의 동적 모듈 로딩 (Dynamic Module Loading in Node.js)**

```ts
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip} from './ZipCodeValidator'; 

if(needZipValidator) {
  let ZipCodeValidator: typeof Zip = require('./ZipCodeValidator');
  let validator = new ZipCodeValidator();
  if(validator.isAcceptable('...')) {}
}
```

**샘플: require.js의 동적 모듈 로딩**

```ts
declare function require(moduleNames: string[], onLoad: (...args: any[]) => void): void;

import * as Zip from './ZipCodeValidator';

if(needZipVlidation) {
  require(['./ZipCideValidator'], (ZipCodeValidator: typeof Zip) => {
    let validator = new ZipCodeValidator.ZipCodeValidator();
    if(validator.isAcceptable('...')) {}
  })
}
```


**샘플: System.js의 동적 모듈 로딩**

```ts
declare const System: any;

import { ZipCodeValidator as Zip} from './ZipCodeValidator';

if(needZipValidation) {
  System.import('./ZipCodeValidator').then((ZipCodeValidator: tpyeof Zip) => {
    var x = new ZipCodeValidator();
    if(x.isAceeptable('...')) {}
  })
}
```