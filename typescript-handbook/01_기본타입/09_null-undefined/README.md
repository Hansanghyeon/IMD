# Null 과 Undefined

TypeScript 에서 `undefined` 와 `null` 은 실제로 각기 `undefined` 와 `null` 이라는 자체적인 타입을 가집니다. `void`와 마찬가지로 그것들은 매우(극단적으로) 유용하지 않습니다.

```ts
// 그 외에도 이러한 변수에 할당할 수 있습니다!
let u: undefined = undefined;
let n: null = null;
```

기본적으로 `null` 과 `undefined`는 다른 모든 타입의 서브 타입입니다.
즉 `null` 과 `undefined` 를 `number` 와 같은 것으로 할당 할 수 있습니다.

그러나 `--strictNullChecks` 플래그를 사용할 때 `null` 과 `undefined` 는 `void` 와 그 각각의 타입에만 할당할 수 있습니다.
이렇게 하면 많은 일반적인 오류를 피할 수 있습니다.
`string` 또는 `null` 또는 `undefined` 중 하나를 전달하고 하는 경우 `string | null | undefined` (union 타입)을 사용할 수 있습니다.
다시 한 번 말하자면 이후에 더 많은 `Union` 타입에 관한 내용이 있습니다.

> 메모: 가능한 `--strictNullChecks` 검사를 사용하도록 권장