# 별종 열거형

엄밀히 말하자면 열거형은 문자열과 숫자 멤버와 섞일 수는 있지만 그렇게 할 이유는 없습니다.

```ts
enum BooleanLikeHeterogeneouseEnum {
  No = 0,
  Yes = "YES",
}
```

JavaScript의 런타임 동작을 실제로 사용하려고 하지 않는 한, 이렇게 하지 않는 것이 좋습니다.