# Readonly 지정자

`readonly` 키워드를 사용하여 프로퍼티들을 읽기 전용으로 만들 수 있습니다. 읽기 전용으로 프로퍼티들은 선언 또는 생성자에서 초기화해야합니다.

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit";  // ❗️, name 은 readonly입니다.
```

## 매개변수 프로퍼티

마지막 예제의 `Octopus` 클래스에서 readonly 멤버 `name`과 생성자 매개변수 `theName`을 선언했습니다.<br />
그 다음 바로 `name`을 `theName`으로 설정했습니다.

이것은 매우 일반적인 방법입니다.<br />
매개변수 프로퍼티를 사용하면 한 곳에서 멤버를 생성하고 초기화할 수 있습니다.<br />
당므은 매개 변수 프로퍼티를 사용하여 이전에 `Octopus` 클래스를 추가적으로 수정합니다.

```ts
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}
```

`theName`을 어떻게 삭제했는지 확인하고 생성자에서 `readonly name: string`매개 변수를 사용해 멤버 `name`을 생성하고 초기화할 수 있습니다.

선언과 할당을 하나의 장소로 통합했습니다.

매개변수 프로퍼티는 접근 지정자또는 `readolny` 또는 둘 모두로 생성자 매개변수를 접두어로 붙여 선언합니다. 매개 변수 프로퍼티에 `private`을 사용하면 private 멤버가 선언되고 초기화됩니다.<br />
마찬가지로 `public`와 `protected` 그리고 `readonly`도 마찬가지입니다.
