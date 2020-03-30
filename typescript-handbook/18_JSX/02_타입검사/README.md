# 타입 검사

JSX 타입 검사를 이해하기 위해서는 먼저 내장 요소와 값-기반 요소 사이의 차이를 이해해야 합니다. <br/>
JSX 표현식 `<expr />`이 주어지면 `expr`은 원래 환경에 내장된 것을 참조할 수 있습니다. (예: DOM 환경의 `div`또는 `span`) 또는 직접 작성한 사용자 정의 구성 요소를 참조할 수 있습니다.

이것이 중요한 두 가지 이유가 있습니다.

1. React의 경우, 내장 요소는 문자열 (`React.createElement('div')`)로 방출되는 반면 생선한 컴포넌트는 (`React.createElement(MyComponent)`)가 아닙니다.
2. JSX 요소에서 전달되는 속성의 타입은 다르게 보여야합니다.<br/>
내장 요소 속성은 본질적으로 알려져야 하는 반면에 컴포넌트 자체 속성 집합을 지정하기를 원할 수 있습니다.

TypeScript는 이러한 것들은 구분하기 위해 React와 같은 컨벤션을 사용합니다.<br/>
내장 요소는 항상 소문자로 시작하고 값-기반 요소는 항상 대문자로 시작합니다.

## 내장 요소

내장요소는 `JSX.IntrinsicElements`라는 특수한 인터페이스에서 볼 수 있습니다. 기본적으로 이 인터페이스가 지정되지 않으면 모든 내장 요소에 타입 검사는 하지 않습니다.<br/>
다만 이 인터페이스가 존재하는 경우, 내부 요소의 이름은 `JSX.IntrinsicElements` 인터페이스의 프로퍼티로서 참조됩니다.

예를 들어

```ts
declare namespace JSX {
  interface IntrinsicElements {
    foo: any
  }
}

<foo />;  // 👍
<bar />;  // ❌
```

위의 예제에서 `<foo />`는 잘 동작하지만 `<bar />`는 `JSX.IntrinsicElements`에 지정되지 않았기 때문에 오류가 발생합니다.

```ts
// 참고 JSX.IntrinsicELements 에서 다음과 같이 catch-all 문자열 indexer를 지정할 수도 있습니다.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
```

## 값-기반 요소

값 기반 요소는 스코프에 있는 식별자로 간단히 조회됩니다.

```ts
import MyComponent from './myComponent';

<MyComponent />;         // 👍
<SomeOtherComponent />;  // ❌
```

값 기반 요소를 정의하는 방법에는 두 가지가 있습니다.

1. 무상태 함수형 컴포넌트 (SFC)
2. 클래스 컴포넌트

이 두가지 타입의 값 기반 요소는 JSX 표현식에서 구분할 수 없기 때문에 일단 오버로드 해석을 사용하여 무상태 함수형 컴포넌트로 표현식을 해결하려고 합니다.<br/>
프로세스가 성공하면 선언에 대한 표현식을 해결합니다.<br/>
만약 SFC로 해결하지 못한다면 클래스 컴포넌트로 해결합니다.<br/>
만약 실패한다면 오류를 보고합니다.

### 무상태 함수형 컴포넌트

이름에서 알 수 있듯이 컴포넌트는 첫 번째 인수가 `props`객체인 JavaScript 함수로 정의됩니다.<br/>
반환 타입은 `JSX.Element`에 할당할 수 있도록 강제합니다.

```ts
interface FooProp {
  name: string;
  X: number;
  Y: number;
}

declare function AnotherComponent(prop: { name: string });
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name=prop.name />;
}

const Button = (prop: { value: string}, context: { color: string })  => <button>
```

SFC는 단순히 JavaScript 함수이기 때문에 여기서도 함수 오버로드를 활용할 수 있습니다.

```ts
interface ClickableProps {
  children: JSX.Element[] | JSX.Element
}

interface HomeProps extends ClickableProps {
  home: JSX.Element;
}

interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}

function MainButton(props: HomeProps): JSX.ELement;
function MainButton(props: SideProps): JSX.Element {
  // ...
}
```

### 클래스 컴포넌트

클래스 컴포넌트의 타입을 제한할 수  있습니다.<br/>
핟지만 이를 위해서 새로운 두 가지를 도입해야 합니다. 요소 클래스 타입과 요소 인스턴스 타입

`<Expr />`에 주어진 요소 클래스 타입은 `Expr`입니다.<br/>
따라서 위 예제의 `MyComponent`가 ES6 클래스라면 이 클래스가 그 클래스 타입이 될 것입니다.<br/>
만일 `MyComponent`가 팩토리 함수라면 클래스 타입이 그 함수가 될 것입니ㅏㄷ.

한 번 클래스 타입이 설정되면 인스턴스 타입은 클래스 타입의 호출 시그니처과 구조 시그니처의 변환 타입 유니온에 따라 결정됩니다.<br/>
다시 ES6 클래스의 경우, 인스턴스 타입이 되고 팩토리 함수의 경우 함수에서 반환되는 값의 타입이 됩니다.

```ts
class MyComponent {
  render() {}
}

// 구조 시그니처 사용
var myComponent = new MyComponent();

// 요소 클래스 타입 => MyComponent
// 요소 인트턴스 타입 => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {}
  }
}

// 호출 시그니처 사용
var myComponent = MyFactoryFunction();

// 요소 클래스 타입 => 팩터리 함수
// 요소 인스턴스 타입 => { render: () => void }
```

요소 인스턴스 타입이 흥미로운 이유는 `JSX.ElementClass`에 할당되어야 하며 그렇지 않을 경우 오류가 발생하기 때문입니다.<br/>
기본적으로 `JSX.ElenmentClass`는 `{}`이지만 JSX의 사용을 적절한 인터페이스에 맞는 타입으로 제한하도록 확장할 수 있습니다.

```ts
declare namespace JSX {
  interface ElementClass {
    render: any;
  }
}

class MyComponent {
  render() {}
}
function MyFactoryFunction() {
  return { render: () => {}}
}

<MyComponent />;  // 👍
<MyFactoryFunction />;  // 👍

class NotAValidComponent {}
function NotAValidFactoryFunction() {
  return {};
}

<NotAvalidComponent />;  // ❌
<NotAvalidFactoryFunction />  // ❌
```