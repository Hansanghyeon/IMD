# 모듈 확대

JavaScript 모듈은 병합을 지원하지는 않지만 기존 객체를 가져와서 업데이트할 수 있습니다.<br/>
Observable 예제를 살펴봅시다.

```ts
// ovservable.js
export class Observable<T> {
  // .. 구현은 숙제로
}

// map.js
import { Observable } from './observable';
Observable.prototype.map = function (f) {
  //
}
```

이 것은 TypeScript에서도 잘 작동하지만 컴파일러는 `Observable.prototype.map`에 대해 알지 못합니다.<br/>
이런 경우 모듈 확대를 사용하여 컴파일러에 다음에 대해 알릴 수 있습니다.

```ts
// map.ts
import { Observable } from './observable';
declare module './observable' {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Obserable<U>;
  }
}
Observable.prototype.map = function (f) {
  // ...
}

// consumer.ts
import { Observable } from './obserbale';
import './map';
let o: Observable<number>;
o.map(x => x.toFixed());
```

모듈 이름은 `import/export`의 모듈 지정자와 같은 방법으로 해석됩니다.<br/>
확대되는 선언은 마치 원본과 같은 파일에 선언된 것처럼 병합됩니다.<br/>
그러나 홧대에서 새로운 최상위 레벨 선언을 새롭게 할 수는 없습니ㅏㄷ. --기존 선언에 패치만 하면 됩니다.

## 전역 확대

모듈 내부에서 전역 스코프 선언을 추가할 수도 있습니다.

```ts
// observable.ts
export class Observable<T> {
  //
}

declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}

Array.prototype.toObservable = function() {

}
```

전역 확대는 모듈 확대와 같은 작동 및 제한 사항을 가집니다.