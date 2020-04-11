# 모듈을 위한 코드 생성

컴파일시 지정된 모듈 대상에 따라 컴파일러는 Node.js(CommonJS), require.js(AMD), UMD, SystemJS 또는 ECMAScript2015 네이티브모듈(ES6)에 적절한 코드를 생성합니다.<br/>
생성된 코드에서 `define`, `require` 및 `register` 호울에 대한 자세한 정보는 각 모듈 로더에 대한 문서를 참조하세요.

이 간단한 예제는 import 및 export 중에 사용되는 이름이 모듈 로딩 코드로 어떻게 변환되는지 보여줍니다.

**SimpleModule.ts**

```ts
import m = require('mod');
export let t = m.something + 1;
```

**AMD/RequireJS SimpleModule.js**

```ts
defined(['require', 'exports', './mod'], function(require, exports, mod_1) {
  exports.t = mod_1.something + 1;
})
```

**CommonJS/Node SimpleModule.js**

```ts
var mod_1 = require('./mod');
exports.t = mode_1.something + 1;
```

**UMD SimpleModule.js**

```ts
(function(factory) {
  if (type of module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports); if (v !== undefined) module.exports = v;
  } else if (typeof defined === 'function' && defined.amd) {
    defined(['require', 'exports', './mod'], factory);
  }
})(function(require, exports) {
  var mod_1 = require('./mod');
  exports.t = mod_1.something + 1;
})
```

**System SimpleModule.js**

```ts
System.register(['./mod'], function(exports_1) {
  var mode_1;
  var t;
  return {
    setters: [
      function (mod_1_1) {
        mod_1 = mod_1_1;
      }
    ],
    execute: function() {
      exports_1('t', t = mod_1.something + 1);
    }
  },
})
```

**Native ECMAScript 2015 modules SimpleModule.js**

```ts
import { something } from './mod';
export var t = something + 1;
```