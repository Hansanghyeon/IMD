# 열거형

열거형은 숫자와 호환되며 숫자는 열거형과 호환됩니다.<br/>
다른 열거형에서 가져온 열거형의 값은 호환되지 않는 것으로 간주됩니다.

예를 들어

```ts
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready
status = Color.Green;  // ❌
```