TypeScript 2.3 및 이후 버전에서는 `--checkJs`를 사용하여 `.js` 파일에서 타입 검사 및 오류 보고 모드를 지원합니다.

일부 파일에 `// @ts-nocheck` 주석을 추가하여 검사하는 것을 건너뛸 수 있습니다<br/>
반대로 `--checkJs`를 설정하지 않고 `// @ts-check` 주석을 추가하여 몇개의 `.js` 파일 만 검사하도록 선택할 수 있습니다.<br/>
앞 줄에 `// @ts-ignore`를 추가하여 특정 라인의 오류를 무시할 수도 있습니다.

다음은 `.ts` 파일에서 `.js` 파일로 작업하는 방법에 주목할만한 차이점입니다.

## JSDoc에서 타입 사용

흔히 `.js` 파일에서 `.ts` 파일처럼 타입을 추혼할 수 있습니다.<br/>
마찬가지로 타입을 추론할 수 없는 경우 타입 주석을 `.ts` 파일에서와 같은 방식으로 JSDoc을 사용하여 지정할 수 있습니다.

JSDoc 주석은 선언을 추가하여 해당 선언의 타입을 설정하는 데 사용됩니다.

```js
/** @type {number} */
var x;

x = 0;  // 👍
x = false;  // ❌, number에 boolean을 할당할 수 없습니다.
```

### 클래스 본문 할당에서 추론된 프로퍼티 선언

ES2015/ES6는 클래스에 속성을 선언하는 수단이 없습니다.<br/>
프로퍼티는 객체 리터럴처럼 동적으로 할당됩니다.

`.js` 파일에서 프로퍼티 선언은 클래스 본문 내부의 프로퍼티에 대한 할당에서 유추됩니다.<br/>
프로퍼티 타입은 이러한 할당에서 모든 오른쪽 값의 타입을 결합한 것입니다.<br/>
생성자에 정의된 프로퍼티는 항상 존재한다고 가정하며 메서드, getter 또는 setter에 정의된 프로퍼티는 선택적으로 간주합니다.

필요에 따라 프로퍼티 타입을 지정하기 위해 JSDoc으로 프로퍼티를 할당합니다.

```ts
class C {
  constructor() {
    /** @type {number | undefined} */
    this.props = undefined;
  }
}

let c = new C();
c.prop = 0;         // 👍
c.prop = "string"   // ❌, number | undefined에 string을 할당할 수 없습니다.
```

프로퍼티가 클래스 본문에 설정되지 않으면 알 수 없는 것으로 간주합니다.<br/>
클래스에 읽기 전용 프로퍼티가 있는 경우 생성자에서 초기화로 undefined를 추가하는 것이 좋습니다.<br/>
예 `this.props = undefined;`

## CommonJS 모듈 입력 지원

`.js` 파일에서 CommonJS 모듈 포맷은 입력 모듈 포맷으로 하용됩니다.<br/>
`exports`와 `module.exports`에 대한 할당은 export 선언으로 인식됩니다.<br/>
비슷하게, `require` 함수 호출은 모둘 imports로 인식됩니다.

예를 들어

```js
// import module 'fs'
const fs = require('fs');

// export function readFile
module.exports.readFile = function(f) {
  return fs.readFileSync(f);
}
```

## 객체 리터럴에는 제한이 없습니다.

기본적으로 변수 선언에 객체 리터럴은 선언의 타입을 제공합니다.<br/>
원래 초기화 시에는 지정되지 않은 새 멤버를 추가할 수 없습니다.<br/>
이 규칙은 `.js` 파일에서 관대한 편입니다. 객체 리터럴은 원래 정의되지 않은 속성을 추가하고 조회할 수 있는 확장 가능한 타입을 가지고있습니.

예를 들어

```js
var obj = {a: 1};
obj.b = 2;  // 허용됨
```

객체 리티럴은 닫힌 객체가 아닌 오픈 maps으로 처리될 수 있도록 하는 기본 인덱스 시그니처 `[x:string]: any`을 갖습니다.<br/>
다른 특별한 JS검사와 마찬가지로, 이 동작은 변수에 대한 JSDoc 타입을 지정하여 변경할 수 있습니다.

예를 들어

```js
function bar(a, b) {
  console.log(a + " " + b);
}

bar(1);         // 👍, 두번째 인수는 선택사항으로 간주됩니다.
bar(1, 2);
bar(1, 2, 3);   // ❌, 인수가 너무 많습니다.
```

JSDoc 주석이 적용된 함수는 이 규칙에서 제외됩니다.<br/>
선택사항을 명시하기 위해 JSDoc 선택적 매개 변수 구문을 사용하세요.

```js
/**
  * @param {string} [somebody] - Somebody의 이름
  */
function sayHello(somebody) {
  if (!somebody) {
    somebody = 'John Doe';
  }
  alert("Hello "+ somebody);
}
sayHello();
```

## `arguments`의 사용으로 추론된 Var-args 매개변수

본문인 `arguments` 참조에 대한 참조를 갖는 함수 var-arg 매개변수 (즉, `(..arg: any[]) => any`)가 있음을 암시적으로 간주합니다.<br/>
JSDoc var-arg 구문을 사용하여 인수의 타입을 지정하세요

### 지정되지 않은 타입 매개변수의 기본값은 `any` 입니다.

지정되지 않은 제네릭 타입 매개변수는 기본적으로 `any`로 설정됩니다.<br/>
이런 일이 발생하는 곳은 거의 없습니다.

*extends에서*

에를 들어, `React.Component`는 `Props`와 `State`의 두 가지 제네릭 타입 매개 변수를 갖도록 정의됩니다. .js 파일에는 extend 정에 이들을 지정하는 합법적인 방법이 없습니다. js 파일에는 extend에 이적들을 지정하는 정당한 방법이 없습니다.

기본적으로 타입 인수는 `any` 입니다.

```js
import { Component } from 'react';

class MyComponent extends Component {
  render() {
    this.props.b; // 👍, this.props.는 any 타입이므로
  }
}
```

JSDoc `@aguments`를 사용하여 타입을 명시적으로 지정합니다.

```js
import { Component } from 'react';

/**
 * @aguments { Component<{a: number}, State>}
 */
class MyComponent extends Component {
  render() {
    this.props.b;  // ❌, b는 {a:number} 에 존재하지 않습니다.
  }
}
```

### JSDoc 참조에서

JSDoc의 지정되지 않은 제네릭 타입 인수의 기본값은 any입니다.

```js
/** @type{Array} */
var x = [];

x.push(1);        // 👍
x.push("string"); // 👍, x는 Array<any>의 타입니다.

/** @type(Array.<number>) */
var y = [];

y.push(1);        // 👍
y.push("string"); // ❌, string은 number에 할당할 수 없습니다.
```

#### 함수 호출에서

제네릭 함수 호출은 제네릭 타입 매개 변수를 추론하기 위한 인수를 사용합니다.<br/>
때때로 이 프로세스는 추론 소스가 부족하여 어떤 타입도 추론하지 못하는 경우가 있습니다.<br/>
이 경우 제네릭 타입 매개 변수는 `any`로 기본 설정됩니다.

예를 들어

```js
var p = new Promise((resolve, reject) => {reject() });

p;  // Promise<any>;
```
