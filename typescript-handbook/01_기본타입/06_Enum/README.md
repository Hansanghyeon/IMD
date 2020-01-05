# Enum

JavaScript 의 표준 데이터 타입 집합에 추가할 수 있는 유용하고 부가적인 추가 자료는 `enum`입니다.
C#과 같은 언어에서처럼 enum은 numeric 값 집합에 더 친숙한 이름을 부여하는 방법입니다.

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

기본적으로 enums는 `0`부터 시작하는 자신의 멤버 번호를 매기기 시작합니다.
멤버 중 하나의 값을 수동으로 설정하여 이를 변경할 수 있습니다.
예를 들어 이전 예제를 `0`대신 `1`로 시작할 수 있습니다.

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
또는 열거 형의 모든 값을 수동으로 설정합니다.

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

enum의 편리한 기능은 숫자 값에서 enum의 해당 값 이름으로 이동할 수 있다는 것입니다.
예를 들어, 값 `2`를 가지고 있지만 위의 `Color` enum에서 매핑된 값이 무엇인지 확실하지 않은 경우에 그에 상응하는 이름을 찾을 수 있습니다.

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);  // 위의 값이 2 이므로 'Green'을 표시합니다
```