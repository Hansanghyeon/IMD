# 다른 JavaScript 라이브러리로 작업하기

TypeScript에서 작성되지 않은 라이브러리의 형태를 설명하려면 라이브러리에서 표시하는 API를 선언해야 합니다.<br/>
대부분의 JavaScript 라이브러리는 몇 개의 최상위 레발의 객체만 노출하므로 네임스페이스는 객체를 표현할 수 있는 좋은 방법입니다.

구현은 "ambient"으로 정의하지 않는 선언을 호출합니다.<br/>
일반적으로 이들은 `.d.ts` 파일에 정의되어 있습니다.<br/>
C/C++에 익숙하다면 `.d.ts` 파일로 생각할 수 있습니다.

## Ambient Namespace

인기 있는 라이브러리 D3는 `d3`이라는 전역 객체에서 기능을 정의합니다.<br/>
이 라이브러리는 `<script>` 태그(모듈 로더 대신)를 통해 로드되기 때문에 선언에 네임스페이스를 사용하여 그 형태를 정의합니다.<br/>
TypeScript 컴파일러가 이 형태를 보려면 ambient 네임스페이스 선언을 사용합니다. 예를 들어 다음과 같이 작성할 수 있습니다.

**D3.d.ts (simplified excerpt)**

```ts
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    }
  }
  export interface Event {
    x: number;
    y: number;
  }
  export interface Base extends Selectors {
    evnet: Event;
  }
}

declare var d3: D3.Base;
```
