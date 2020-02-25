# 문자열 리터럴 타입

문자열 리터럴 타입을 사용하여 문자열에 필요한 정확한 값을 지정할 수 있습니다.<br/>
실제로 문자열 리터럴 타입은 유니온 타입, 타입 가드 및 타입 aliases와 잘 결합됩니다.<br/>
이러한 기능을 함께 사용하여 문자열에서 열거형과 같은 동작을 얻을 수 있습니다.

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
class UIELement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ..
    }
    else if (easing === 'ease-out') {}
    else if (easing === 'ease-in-out') {}
    else {
      // ❌, null 또는 undefined로 통과해서는 안 됩니다.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, 'uneasy');  // ❌, 여기서 'uneasy'가 허용되지 않습니다.
```

허용되는 세 문자열 중 아무거나 전달할 수 있지만 다른 문자열은 오류를 제공합니다.

오버로드를 구별하기 위해 동일한 방법으로 문자열 리터럴 타입을 사용할 수 있습니다.

```ts
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;
// ... more
function createElement(tagName: string): Element {
  // ... 코드는 여기에 있습니다.
}
```