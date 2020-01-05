# Never

`never` 타입은 절대로 발생하지 않는 값의 타입을 나타냅니다.<br/>
에를 들어 `never`는 함수 표현식의 반환 타입이거나 항상 예외를 던지는 화살표 함수 표현식이거나 절대 반환하지 않는 표현식입니다.<br/>
변수는 또한 `never` 일때 타입 가드에 의해 좁혀지더라도 결코 사실일 수 없으며 타입을 획득하지 못합니다.

`never` 타입은 모든 타입의 서브 타입이며 모든 타입에 할당할 수 있습니다.<br/>
어떤 타입도 `never`의 서브 타입이거나 할당 가능한 타입은 아닙니다. (`never` 자체를 제외하고).<br/>
`any` 조차도 `never`에 할당할 수 없습니다.<br/>
`never`를 반환하는 함수의 몇 가지 예는 다음과 같습니다.

```ts
// 반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안 됩니다.
function error(meessage: string): never {
  throw new Error(message);
}

// 추론되는 반환 타입은 절대로 없습니다.
function fail() {
  return error("Something filed");
}

// 반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안 됩니다/
function infiniteLoop(): never {
  while (true) {
  }
}
```