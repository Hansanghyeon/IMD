# 교차타입

교차 타입은 다양한 타입을 하나로 결합합니다.<br/>
따라서 기존 타입을 추가하여 필요한 모든 기능을 갖춘 단일 타입을 얻을 수 있습니다.

예를 들어 `Person & Seializable & Loggable`은 `Person`과 `Serializable`이며 `Loggable`입니다.<br/>
즉 이 타입의 객체는 세 가지 타입의 모든 멤버를 갖게 됩니다.

믹스인에 사용되는 교차 타입과 고전적인 객체 지향 형식에 맞지 않는 다른 개념을 볼 수 있습니다.<br/>
(JavaScript에 이러한 것들이 많습니다!)

여기서 Mixin을 만드는 방법을 보여주는 간단한 예제가 있습니다.

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]'
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    // ...
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```
