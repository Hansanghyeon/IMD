# 선택적 프로퍼티

인터페이스의 모든 프로퍼티가 필수로 필요할 수는 없습니다.<br/>
어떤 것들은 특정한 조건 하에 존재하거나 아예 존재하지 않을 수도 있습니다.<br/>
이러한 선택적 프로퍼티는 프로퍼티 중에서 일부만 채워진 객체를 함수에 전달하는 "옵션 백(option bags)"과 같은 패턴을 생성할 때 많이 사용됩니다.

다음은 이 패턴의 예입니다.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if(config.color) {
    newSquare.color = config.color;
  }
  if(config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSqaure;
}

let mySquare = createSquare({ color: 'black' });
```

선택적 프로퍼티를 가진 인터페이스는 다른 인터페이스와 유사하게 작성되며 선언된 프로퍼티 이름 끝나 `?`로 표시됩니다.<br/>
선택적 프로퍼티의 장점은 사용 가능한 프로퍼티를 설명하는 동시에 인퍼에시으에 포함되지 않은 프로퍼티의 사용을 방지할 수 있다는 것입니다.<br/>
예를 들어 `createSquare`에서 `color` 프로퍼티의 이름을 잘못 입력하면 다음과 같은 오류 메시지가 표시됩니다.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SqaureConfig ): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if(config,color) {
    // ❗️, 'SqaureConfig' 타입에 'clor' 프로퍼티가 존재하지 않습니다.
    newSqaure.color = config.clor;
  }
  if(config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySqaure = createSqaure({ color: "black" });
```
