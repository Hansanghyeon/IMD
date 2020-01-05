# Void

`void`는 `any`의 정반대이지만 조금 비슷합니다.
일반적으로 반환 값을 반환하지 않는 함수의 반환 타입으로 볼 수 있습니다.

```ts
function warnUser(): void {
  alert("This is my warning message");
}
```

`void` 타입의 변수 선언은 `undefined` 또는 `null` 만 할당할 수 있으므로 유용하지 않습니다.