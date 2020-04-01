# 속성 타입 검사

속성 타입 검사를 하는 첫 번째 단계는 요소 속성 타입을 결정하는 것입니다.<br/>
이것은 내장 요소와 값 기반 요소 간에 약간의 차이가 있습니다.

내장 요소의 경우 `JSX.IntrinsicElements` 프로퍼티의 타입입니다.

```ts
declare namespace JSX {
  interface IntrinsicElements {
    foo: { bar? : boolean }
  }
}

// "foo"에 대한 요소 속성 타입은 "{bar?: boolean }"입니다.

<foo bar />
```

값 기반 요소의 경우 조금 더 복잡합니다.<br/>
이전에 결정된 요소 인스턴스 타입의 프로퍼티 타입에 따라 결정됩니다.<br/>
사용할 프로퍼티는 `JSX.ElementAttributesProperty`에 의해 결정됩니다.<br/>
단일 프로퍼티로 선언해야 합니다.<br/>
그런 다음 해당 프로퍼티의 이름이 사용됩니다.

```ts
declare namespace JSX {
  interface ElementAttributesProperty {
    props; // 사용할 프롶티 이름을 지정합니다.
  }
}

class MyComponent {
  // 요소 인스턴스 타입에 대한 프로퍼티를 지정합니다.
  props: {
    foo?: string;
  }
}

// 'MyComponent'의 요소 속성 타입은 '{foo?: string}'입니다.
<MyComponent foo="bar" />
```

요소 속성 타입은 JSX에서 속성을 타입을 확인하는 데 사용됩니다.<br/>
선택적 프로퍼티와 필수 프로퍼티가 지원됩니다.

```ts
declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProps: string; optionalProp?: number }
  }
}

<foo requiredPro='bar' />                       // 👍
<foo requiredPro='bar' optionalProp={0} />      // 👍
<foo />                                         // ❌, requiredProp이 없습니다.
<foo requiredPro={0} />                         // ❌, requiredProp이 문자열이어야 합니다.
<foo requiredPro='bar' unknownProp />           // ❌, unknownProp이 존재하지 않습니다.
<foo requiredPro='bar' some-unknown-prop />     // 👍, 'some-unknown-prop'은 유요한 식별자가 아니기 때문에
```

> 참고: 속성 이름이 유효한 JS 식별자(예: `data-*`속성)가 아닌 경우 요소 속성 타입에서 속성 이름을 찾을 수 없으며 오류로 간주되지 않습니다.

전개 연산자도 작동합니다.

```ts
var props = { requiredProp: 'bar'};
<foo {...props} />;  // 👍

var badProps = {};
<foo {...badProps} />;  // ❌
```
