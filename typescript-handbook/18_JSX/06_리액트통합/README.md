# 리액트 통합

React와 함께 JSX를 사용하려면 React typings을 사용해야 합니다.<br/>
이러한 typings은 React와 함께 사용하기에 적합하도록 `JSX` 네임스페이스를 적절하게 정의합니다.

```tsx
/// <rederence path="react.d.ts" />

interface Props {
  foo: string;
}

class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>
  }
}

<MyComponent foo="bar" />;  // 👍
<MyComponent foo={0} />;    // ❌
```