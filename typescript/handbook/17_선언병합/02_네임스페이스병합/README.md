# 네임스페이스 병합

인터페이스와 마찬가지로 같은 이름의 네임 스페이스도 해당 멤버를 병합합니다.<br/>
네임 스페이스는 네임 스페이스와 값을 모두 생성하기 떄문에 두 네임 스페이스가 어떻게 병합되는지 이해해야 합니다.

네임 스페이스를 병합하기 위해 각 네임스페이스에 선언된 exported 인터페이스의 타입 정의 자체가 병합되며 내부에 병합된 인터페이스 정의가 있는 단일 네임스페이스를 형성합니다.

네임 스페이스 값을 병합하려면 각 선언 사이트에 지정된 이름의 네임 스페이스가 이미 있는 경우 기존네임 스페이스를 가져와 두 번째 네임 스페이스의 내보낸 멤버를 첫 번째 네임스페이스에 추가하여 네임스페이스를 확장합니다.

이 예에서는 `Animals`의 병합을 선언합니다.

```ts
namespace Animals {
  exports class Zebra {}
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog {}
}
```

다음과 같습니다.

```ts
namespace Animals {
  export interface Legged { numberOfLegs: number; }

  export class Zebra {}
  export class Dog {}
}
```

병합된 네임스페이스의 모델은 유용한 출발점이지만 내보내지 않은(non-exported) 멤버에 무슨 일이 일어나는지 이해할 필요가 있습니다.<br/>
내보낼 수 없는 멤버는 원래(병합되지 않은) 네임 스페이스에서만 볼 수 있습니다.<br/>
즉 병합 후에는 다른 선언에 가져온 병합된 멤버는 내보낼 수 없으며 멤버를 볼 수 없습니다. 내보내지 않은 멤버는 원래 네임스페이스에서만 볼 수 있습니다(병합되지 않음).<br/>
즉 병합 후에 다른 선언에서 가져온 병합된 멤버는 내보내지 않은 멤버를 볼 수 없습니다.

이 에제에서 이것을 더 명확하게 볼 수 있습니다.

```ts
namespace Animal {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
    return haveMuscles;  // <--- 오류, haveMuscles는여기에 표시되지 않습니다.
  }
}
```

`haveMuscles`가 exported 되지 않았기 때문에 동일하게 병합되지 않은 네임스페이스를 공유하는 `animalsHaveMuscles` 함수만 이 심볼을 볼 수 있습니다.<br/>
`doAnimalsHaveMuscles` 함수는 병합된 `Animal` 네임스페이스의 일부임에도 불구하고 exported 되지 않은 멤버를 볼 수 없습니다.