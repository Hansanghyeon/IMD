# 숫자 열거형

먼저 숫자 열거형으로 시작합니다<br/>
다른 언어에서 열거형을 접해봤다면 더 익숙할 것입니다.<br/>
열거형은 `enum` 키워드를 사용하여 정의할 수 있습니다.

```ts
enum Direcion {
  Up = 1,
  Down,
  Left,
  Right,
}
```

위에서 `Up`은 `1`로 초기화된 숫자 열거형입니다.<br/>
아래에 이어서 등장하는 멤버들은 자동으로 증가합니다.<br/>
즉, `Direction.Up`dms `1`, `Down`,은 `2`, `Left`는 `3`, `Right`는 `4`입니다.

원한다면 초기화를 완전히 없앨 수도 있습니다.

```ts
enum Direcion {
  Up,
  Down,
  Left,
  Right,
}
```

여기에서는 `Up`은 `0`이며, `Down`은 `1`이 됩니다.<br/>
이 자동 증가 동작은 멤버의 값 자체에 신경 쓰지 않고 각 열거형이 동일한 열거형의 다른 값과 구별 되는 경우에 유용합니다.

열거형을 사용하는 것은 간단합니다. 열거형 자체의 속성으로 모든 멤버에 엑섹스하고, 열거형의 이름을 사용하여 타입을 선언합니다.

```ts
enum Response {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: Response): void {
  // ...
}

respond("Princess Caroline", Response.Yes);
```

숫자 열거형은 계산된, 상수 멤버에 혼합될 수 있습니다.<br/>
단편적으로 초기화가 없는 열거형은 상수 또는 다른 상수 열거형의 멤버로 초기화된 숫자 열거형을 따라야 할 필요가 있습니다.<br/>
즉, 다음은 허용되지 않습니다.

```ts
enum E {
  A = getSomeValue(),
  B,  // ❌, A는 상수로 초기화되지 않았으므로 B에 초기화가 필요합니다.
}
```