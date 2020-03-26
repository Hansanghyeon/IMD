# 클래스, 함수 그리고 열거형 병합

네임스페이스는 다른 타입의 선언과도 통합이 가능할 정도로 유연합니다.<br/>
이렇게 하려면 네임스페이스 선언이 병합할 선언을 따라야 합니다.<br/>
결과 선언에 두 선언 타입의 프로퍼티가 있습니다.<br/>
TypeScript는 이 기능을 사용하여 JavaScript의 일부 패턴과 다른 프로그래밍 언어를 모델링 합니다.

## 클래스와 네임스페이스 병합

이는 사용자에게 내부(inner) 클래스를 설명하는 방법을 제공합니다.

```ts
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel;
}
```

병합된 멤버의 가시성 규칙은 '네임스페이스 병합' 섹션에 설명된 것과 같으므로 병합된 클래스를 보려면 `AlbumLabel` 클래스를 export 해야 합니다.<br/>
최종 결과는 다른 클래스 내부에서 관리되는 클래스입니다.<br/>
네임스페이스를 사용하여 기존 클래스에 더 많은 정적 멤버를 추가할 수도 있습니다.

내부 클래스 패턴 외에도 함수를 생성한 다음 함수에 프로퍼티를 추가하여 함수를 확장하는 JavaScript 방법에 익숙할 수도 있습니다.<br/>
TypeScript는 이러한 타입을 안전한(type-safe)방법으로 정의하기 위해 선언 병합을 사용합니다.

```ts
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = '';
  export let prefix = 'Hello, ';
}

alert(buildLabel('Sam Smith'));
```

마찬가지로 네임스페이스를 사용하여 정적 멤버를 포함하는 열거형을 확장할 수 있습니다.

```ts
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == 'yellow') return Color.red + Color.green;
    else if (colorName == 'white') return Color.red + Color.green + Color.blue;
    else if (colorName == 'magenta') return Color.red + Color.blue; 
    else if (colorName == 'cyan') return Color.green + Color.blue;
  }
}
```