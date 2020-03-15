# 별칭 (Aliases)

네임스페이스 작업을 단순화할 수 있는 또 다른 방법은 `import x = require("name")`를 사용하여 일반적으로 사용되는 객체의 더 짧은 이름을 생성하는 것입니다.

```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Ploygons;
let sq = new ploygons.Square();
```

`require` 키워드는 사용하지 않습니다. 대신 가져오는 심볼에 걸맞는 이름을 직접 할당합니다<br/>
이것은 `var` 사용과 비슷하지만 가져온 심볼의 타입과 네임스페이스 의미에 대해서도 작용합니다.<br/>
중요한 점은, 값의 경우 `import`는 원래 심볼과 별개의 참조이므로 앨리어싱된 `var`에 대한 변경 사항은 원래 변수에 반영되지 않습니다.
