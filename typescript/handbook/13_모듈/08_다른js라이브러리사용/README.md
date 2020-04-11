# 다른 JavaScript 라이브러리 사용

TypeScript로 작성되지 않은 라이브러리의 형태를 설명하려면 라이브러리가 나태내는 API를 선언해야 합니다.

구현을 "ambient"으로 정의하지 않은 선언이라고 하며 일반적으로 이들은 `.d.ts`파일에 정의되어 있습니다.<br/>
C/C++에 익숙하다면 이것들을 `.h`파일로 생각할 수 있을 것입니다.

몇 가지 예를 들어보겠습니다.

## Ambient Modules

Node.js에서 대부분의 작업은 하나 이상의 모듈을 로드하여 수행됩니다.<br/>
각 모듈을 `.d.ts` 파일에 최상위 수준의 내보내기 선언으로 정의할 수 있지만 더 넓은 `.d.ts`파일로 작성하는 것이 더 편리합니다.<br/>
그렇게 하기 위해서 amibent 네임스페이스와 비슷한 구조를 사용하지만 나중에 import 할 수 있는 모듈의 `module` 키워드와 따옴표 붙은 이름을 사용합니다.

**node.d.ts (simplified excerpt)**

```ts
declare module 'url' {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module 'path' {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

이제 `/// <reference>` `node.d.ts`를 만들 수 있고 `import url = require('url');` 또는 `import * as URL from 'url'`를 사용하여 모듈을 적재할 수 있습니다.

```ts
/// <reference path="node.d.ts">
import * as URL from 'url';
let myUrl = URL.parse('http://typescript.org');
```

## Shorthand ambient modules

새로운 모듈을 사용하기 전에 선언을 작성하는 시간을 내고 싶지 않다면 shorthand 선언을 사용하여 빠르게 시작할 수 있습니다.

**declaretions.d.ts**

```ts
declare module 'hot-new-module';
```

shorhand 모듈의 모든 imports는 `any`타입을 가집니다.

```ts
import x, {y} from 'hot-new-module';
x(y);
```

## Wildcard module declarations

SystemJS 및 AMD 같은 일부 모듈 로더들은 JavaScript가 아닌 컨텐츠를 import 할 수 있습니다.<br/>
일반적으로 특별한 로드의 의미론을 나타내는 접두사 또는 접미사를 사용한다.<br/>
이러한 경우를 다루기 위해 Wildcard 모듈 선언을 사용할 수 있습니다.

```ts
declare module '*!text' {
  const content: string;
  export default content;
}
// 일부는 그 반대의 방법을 사용합니다 .
declare module "json!.*" {
  const value: any;
  export default value;
}
```

이제 `'*!text'`또는 `'json!*'`과 일치하는 것을 import 할 수 있습니다.

```ts
import fileContent from './xyz.txt!text';
import data from 'json!http://example.com/data.json';
console.log(data, fileContent);
```

## UMD modules

일부 라이브러리는 많은 모듈 로더에서 사용하도록 설계되었거나 모듈 로드가 없습니다 (글로벌 변수).<br/>
이러한 모듈을 UMD 모듈이라고 합니다.<br/>
이러한 라이브러리는 import 또는 글로벌 변수를 통해 접근할 수 있습니다.

예를 들어

**math-lib.d.ts**

```ts
export function isPrime(x: number): boolean;
export as namespace mathLib;
```

그러면 라이브러리를 모듈에서 import로 사용할 수 있습니다.

```ts
import { isPrime } from 'math-lib';
isPrime(2);
mathLib.isPrime(2);  // 오류: 모듈 내부에서 전역 전의를 할 수 없습니다.
```

글로벌 변수로 사용할 수도 있지만 스크립트 내부에서만 사용할 수 있습니다.<br/>
(스크립트는 imports 또는 exports가 없는 파일입니다)

```ts
mathLib.isPrime(2);
```