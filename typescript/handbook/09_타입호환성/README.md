# 타입 호환성

TypeScript의 타입 호환성은 구조적 하위 타입을 기반으로합니다.<br/>
구조적 타이핑은 멤버에 따라 타입을 관계시키는 방법입니다.<br/>
이것을 이름뿐인 타이핑과 대조적입니다.

```ts
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// 구조적 타이핑이니까 👍
p = new Person();
```

C# 또는 Java 같은 명사적인 언어에서는 `person` 클래스가 자신을 `Named` 인터페이스의 구현체로 명시적으로 기술하지 않기 때문에 동일한 코드가 오류가 될 수 있습니다.

TypeScript의 구조적인 타입 시스템은 일반적으로 JavaScript 코드가 작성된 방식에 따라 설계되었습니다.

JavaScript는 함수 표현식이나 객체 리터럴과 같은 익명의 객체를 광범위하게 사용하기 때문에 이름뿐인 구조적 타입 시스템 대신 JavaScript 라이브러리에서 발견되는 관계의 타입을 표현하는 것이 훨씬 자연스럽습니다.