# 하이브리드 타입

이전에 언급했듯이 인터페이스는 실제 JavaScript 에서 제공되는 풍부한 타입을 만들 수 있습니다.<br />
JavaScript의 동적이고 유연한 특성으로 인해 위에 설명된 몇 가지 타입의 조합으로 작동하는 객체를 종종 볼 수 있습니다.

이러한 예로 다음과 같이 추가 프로퍼티로 함수와 객체 역할을 모두 하는 객체가 있습니다.

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

써드-파티 JavaScript와 상호 작용할 때 타입의 형태를 완전히 형성하려면 위와 같은 패턴을 사용해야 할 수 있습니다.